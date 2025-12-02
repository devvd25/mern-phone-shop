import Order from '../models/Order.js';
import Cart from '../models/Cart.js';
import Product from '../models/Product.js';

export async function createOrder(req, res) {
  // Expect: items or use cart; shippingAddress, paymentMethod
  const { items, shippingAddress, paymentMethod = 'COD', prices } = req.body;

  let orderItems = items;
  if (!orderItems || orderItems.length === 0) {
    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart || cart.items.length === 0) return res.status(400).json({ message: 'Giỏ hàng trống' });
    orderItems = cart.items.map(i => ({
      product: i.product,
      name: i.name,
      image: i.image,
      price: i.price,
      qty: i.qty
    }));
  }

  // Lấy thông tin giá từ database để đảm bảo chính xác
  const enrichedItems = [];
  for (const item of orderItems) {
    const product = await Product.findById(item.product);
    if (!product) {
      return res.status(400).json({ message: `Sản phẩm ${item.product} không tồn tại` });
    }
    enrichedItems.push({
      product: product._id,
      name: product.name,
      image: product.images?.[0] || '',
      price: product.price,
      qty: item.qty
    });
  }

  const itemsPrice = enrichedItems.reduce((sum, i) => sum + (i.price * i.qty), 0);
  const shippingPrice = itemsPrice > 5000000 ? 0 : 30000;
  const taxPrice = Math.round(itemsPrice * 0.1);
  const totalPrice = Math.round(itemsPrice + shippingPrice + taxPrice);

  const order = await Order.create({
    user: req.user._id,
    items: enrichedItems,
    shippingAddress,
    paymentMethod,
    itemsPrice, 
    shippingPrice, 
    taxPrice, 
    totalPrice
  });

  // Optionally clear cart
  await Cart.findOneAndUpdate({ user: req.user._id }, { items: [] });

  res.status(201).json(order);
}

export async function getMyOrders(req, res) {
  const orders = await Order.find({ user: req.user._id }).sort('-createdAt');
  res.json(orders);
}

export async function getOrderById(req, res) {
  const order = await Order.findById(req.params.id).populate('user', 'username email');
  if (!order) return res.status(404).json({ message: 'Không tìm thấy đơn hàng' });
  if (req.user.role !== 'admin' && order.user._id.toString() !== req.user._id.toString())
    return res.status(403).json({ message: 'Không có quyền xem đơn này' });
  res.json(order);
}

export async function markPaid(req, res) {
  const order = await Order.findById(req.params.id);
  if (!order) return res.status(404).json({ message: 'Không tìm thấy đơn hàng' });
  order.isPaid = true;
  order.paidAt = new Date();
  order.status = 'paid';
  order.paymentResult = req.body.paymentResult || { id: 'cod', status: 'paid' };
  await order.save();
  res.json(order);
}

export async function listAllOrders(req, res) {
  const orders = await Order.find({}).sort('-createdAt');
  res.json(orders);
}

export async function updateOrderStatus(req, res) {
  const order = await Order.findById(req.params.id);
  if (!order) return res.status(404).json({ message: 'Không tìm thấy đơn hàng' });
  const { status } = req.body;
  order.status = status || order.status;
  if (status === 'delivered') order.deliveredAt = new Date();
  await order.save();
  res.json(order);
}

export async function deleteOrder(req, res) {
  const order = await Order.findById(req.params.id);
  if (!order) return res.status(404).json({ message: 'Không tìm thấy đơn hàng' });
  await Order.findByIdAndDelete(req.params.id);
  res.json({ message: 'Đã xóa đơn hàng' });
}
// #sourceMappingURL=orderController.js.map