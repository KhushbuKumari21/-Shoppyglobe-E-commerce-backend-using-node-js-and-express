// routes/cart.js
const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { addToCart, updateCartItem, removeCartItem, getCart } = require('../controllers/cartController');

router.use(protect); // all cart routes are protected

router.post('/', addToCart); // add product
router.get('/', getCart); // get current cart
router.put('/:productId', updateCartItem); // update quantity
router.delete('/:productId', removeCartItem); // remove item

module.exports = router;
