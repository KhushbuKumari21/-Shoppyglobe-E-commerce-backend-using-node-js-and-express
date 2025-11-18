// controllers/cartController.js
const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');
const Cart = require('../models/Cart');
const Product = require('../models/Product');

// POST /cart - add product to cart (user protected)
// body: { productId, quantity }
const addToCart = asyncHandler(async (req, res) => {
  const { productId, quantity = 1 } = req.body;
  if (!productId) {
    res.status(400);
    throw new Error('productId is required');
  }
  if (quantity <= 0) {
    res.status(400);
    throw new Error('Quantity must be at least 1');
  }

  const product = await Product.findById(productId);
  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }
  if (product.stock < quantity) {
    res.status(400);
    throw new Error('Not enough stock');
  }

  let cart = await Cart.findOne({ user: req.user._id });
  if (!cart) {
    cart = new Cart({ user: req.user._id, items: [] });
  }
  const existing = cart.items.find(i => i.product.toString() === productId);
  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.items.push({ product: productId, quantity });
  }
  await cart.save();
  await cart.populate('items.product');
  res.status(201).json(cart);
});

// PUT /cart/:productId - update quantity of a product in cart (body: { quantity })
const updateCartItem = asyncHandler(async (req, res) => {
  const { productId } = req.params;
  const { quantity } = req.body;
  if (!productId) {
    res.status(400);
    throw new Error('productId is required in params');
  }
  if (quantity == null || quantity < 0) {
    res.status(400);
    throw new Error('quantity must be provided and non-negative');
  }

  const product = await Product.findById(productId);
  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }

  const cart = await Cart.findOne({ user: req.user._id });
  if (!cart) {
    res.status(404);
    throw new Error('Cart not found');
  }
  const itemIndex = cart.items.findIndex(i => i.product.toString() === productId);
  if (itemIndex === -1) {
    res.status(404);
    throw new Error('Product not in cart');
  }

  if (quantity === 0) {
    // remove item
    cart.items.splice(itemIndex, 1);
  } else {
    if (quantity > product.stock) {
      res.status(400);
      throw new Error('Not enough stock for requested quantity');
    }
    cart.items[itemIndex].quantity = quantity;
  }
  await cart.save();
  await cart.populate('items.product');
  res.json(cart);
});

// DELETE /cart/:productId - remove product from cart
const removeCartItem = asyncHandler(async (req, res) => {
  const { productId } = req.params;
  if (!productId) {
    res.status(400);
    throw new Error('productId required');
  }
  const cart = await Cart.findOne({ user: req.user._id });
  if (!cart) {
    res.status(404);
    throw new Error('Cart not found');
  }
  const beforeCount = cart.items.length;
  cart.items = cart.items.filter(i => i.product.toString() !== productId);
  if (cart.items.length === beforeCount) {
    res.status(404);
    throw new Error('Product not found in cart');
  }
  await cart.save();
  await cart.populate('items.product');
  res.json(cart);
});

// GET /cart - fetch current user's cart (helpful)
const getCart = asyncHandler(async (req, res) => {
  const cart = await Cart.findOne({ user: req.user._id }).populate('items.product');
  if (!cart) {
    return res.json({ items: [] });
  }
  res.json(cart);
});

module.exports = { addToCart, updateCartItem, removeCartItem, getCart };
