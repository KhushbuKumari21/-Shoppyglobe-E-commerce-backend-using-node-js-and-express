// server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products');
const cartRoutes = require('./routes/cart');
const { errorHandler } = require('./middleware/errorMiddleware');

const app = express();
app.use(cors());
app.use(express.json());

// connect DB
connectDB(process.env.MONGO_URI);

// routes
app.use('/api/auth', authRoutes); // /api/auth/register, /api/auth/login
app.use('/api/products', productRoutes); // GET /api/products
app.use('/api/cart', cartRoutes); // protected cart routes

// health
app.get('/', (req, res) => res.send('ShoppyGlobe API is running'));

// error handler (must be last)
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
