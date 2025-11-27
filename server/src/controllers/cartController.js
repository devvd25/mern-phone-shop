import Cart from '../models/Cart.js';
import Product from '../models/Product.js';

export async function getCart(req, res) {
  let cart = await Cart.findOne({ user: req.user._id });
  if (!cart) cart = await Cart.create({ user: req.user._id, items: [] });
  res.json(cart);
}

export async function addToCart(req, res) {
  const { productId, qty = 1 } = req.body;
  const product = await Product.findById(productId);
  if (!product) return res.status(404).json({ message: 'Không tìm thấy sản phẩm' });

  let cart = await Cart.findOne({ user: req.user._id });
  if (!cart) cart = await Cart.create({ user: req.user._id, items: [] });

  const existing = cart.items.find(i => i.product.toString() === productId);
  if (existing) {
    existing.qty += qty;
  } else {
    cart.items.push({
      product: product._id,
      name: product.name,
      image: product.images?.[0] || '',
      price: product.price,
      qty
    });
  }
  await cart.save();
  res.status(201).json(cart);
}

export async function updateCartItem(req, res) {
  const { productId } = req.params;
  const { qty } = req.body;
  const cart = await Cart.findOne({ user: req.user._id });
  if (!cart) return res.status(404).json({ message: 'Giỏ hàng trống' });
  const item = cart.items.find(i => i.product.toString() === productId);
  if (!item) return res.status(404).json({ message: 'Không có sản phẩm trong giỏ' });
  item.qty = qty;
  cart.updatedAt = new Date();
  await cart.save();
  res.json(cart);
}

export async function removeFromCart(req, res) {
  const { productId } = req.params;
  const cart = await Cart.findOne({ user: req.user._id });
  if (!cart) return res.status(404).json({ message: 'Giỏ hàng trống' });
  cart.items = cart.items.filter(i => i.product.toString() !== productId);
  await cart.save();
  res.json(cart);
}

export async function clearCart(req, res) {
  const cart = await Cart.findOne({ user: req.user._id });
  if (!cart) return res.status(404).json({ message: 'Giỏ hàng trống' });
  cart.items = [];
  await cart.save();
  res.json(cart);
}
