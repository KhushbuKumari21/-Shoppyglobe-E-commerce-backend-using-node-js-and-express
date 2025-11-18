// controllers/productController.js
const asyncHandler = require('express-async-handler');
const Product = require('../models/Product');

// GET /products - list with optional query params: ?limit=&page=&search=
const getProducts = asyncHandler(async (req, res) => {
  const { page = 1, limit = 20, search } = req.query;
  const filter = {};
  if (search) filter.name = { $regex: search, $options: 'i' };

  const skip = (Number(page) - 1) * Number(limit);
  const total = await Product.countDocuments(filter);
  const products = await Product.find(filter).skip(skip).limit(Number(limit));

  res.json({ total, page: Number(page), limit: Number(limit), products });
});

// GET /products/:id
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }
  res.json(product);
});

module.exports = { getProducts, getProductById };
