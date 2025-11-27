import dotenv from 'dotenv';
dotenv.config();
import { connectDB } from './utils/db.js';
import Product from './models/Product.js';

await connectDB();

const demo = [
  {
    name: 'iPhone 15 Pro 128GB',
    description: 'Chip A17 Pro, màn 6.1 OLED 120Hz.',
    price: 27990000,
    images: ['/uploads/demo-iphone15pro.jpg'],
    category: 'smartphone',
    brand: 'Apple',
    quantity: 50,
    specs: { RAM: '8GB', ROM: '128GB', Camera: '48MP' }
  },
  {
    name: 'Samsung Galaxy S24 Ultra 256GB',
    description: 'Snapdragon 8 Gen 3, màn 6.8 120Hz.',
    price: 23990000,
    images: ['/uploads/demo-s24u.jpg'],
    category: 'smartphone',
    brand: 'Samsung',
    quantity: 40,
    specs: { RAM: '12GB', ROM: '256GB', Camera: '200MP' }
  }
];

await Product.deleteMany({});
await Product.insertMany(demo);
console.log('Seeded products');
process.exit(0);
