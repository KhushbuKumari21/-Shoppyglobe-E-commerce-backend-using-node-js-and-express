# ShoppyGlobe Backend API

This is the backend for the **ShoppyGlobe E-commerce** application, built with **Node.js, Express.js, and MongoDB**.

## Features
- User Registration & Login (JWT-based authentication)
- Product Listing & Details
- Shopping Cart Management (Add, Update, Delete, View)
- API input validation and error handling
- MongoDB integration with CRUD operations

## Technologies
- Node.js
- Express.js
- MongoDB / Mongoose
- JWT Authentication
- Express-validator for input validation
- ThunderClient/Postman for API testing

## Installation and run 
1. Clone the repository:
   ```bash
   git clone https://github.com/KhushbuKumari21/-Shoppyglobe-E-commerce-backend-using-node-js-and-express.git
   cd shoppyglobe-backend
2. Install dependencies:
```bash
   npm install

3.Create a .env file in the root with:

   PORT=5000
   MONGO_URI=mongodb+srv://Khushbu123:Khushi%40123@cluster0.jkc0wof.mongodb.net/shoppyglobe?retryWrites=true&w=majority
   JWT_SECRET=977a4d06-9a83-493c-838a-e3e5163371e9

4.Seed the database with sample products:
   npm run seed

5.Start the server:
  npm run dev

The API will run at http://localhost:5000

# API Routes
| Method | Endpoint           | Description              |
| ------ | ------------------ | ------------------------ |
| POST   | /api/auth/register | Register new user        |
| POST   | /api/auth/login    | Login user (returns JWT) |

# Products

| Method | Endpoint          | Description                                               |
| ------ | ----------------- | --------------------------------------------------------- |
| GET    | /api/products     | List all products (with optional `?page=&limit=&search=`) |
| GET    | /api/products/:id | Get product by ID                                         |


# Cart (Protected: require JWT in Authorization header)

| Method | Endpoint             | Description                                     |
| ------ | -------------------- | ----------------------------------------------- |
| POST   | /api/cart            | Add product to cart (body: productId, quantity) |
| GET    | /api/cart            | Get current user's cart                         |
| PUT    | /api/cart/:productId | Update quantity of a product                    |
| DELETE | /api/cart/:productId | Remove product from cart                        |

# Testing :
Test APIs using ThunderClient

Include screenshots of successful and failed requests (e.g., invalid JWT, insufficient stock).
D:\shoppyglobe-backend\Output Image

**#Github Link : -** https://github.com/KhushbuKumari21/-Shoppyglobe-E-commerce-backend-using-node-js-and-express