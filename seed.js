// seed.js
require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const Product = require('./models/Product');

const products = [
  { name: 'Wireless Headphones', price: 1499, description: 'Comfortable, long battery life', stock: 20 },
  { name: 'Smartphone Case', price: 499, description: 'Shockproof cover', stock: 50 },
  { name: 'USB-C Charger', price: 799, description: 'Fast charging 30W', stock: 35 },
  { name: 'Laptop Sleeve', price: 999, description: '13-15 inch', stock: 15 },
  { name: 'Bluetooth Speaker', price: 2499, description: 'Portable speaker', stock: 10 }
];

const seed = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    await Product.deleteMany({});
    const created = await Product.insertMany(products);
    console.log('Seeded products:', created);
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seed();
