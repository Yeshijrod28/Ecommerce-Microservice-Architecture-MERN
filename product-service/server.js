import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB  from './config/db.js';
import productRoutes from './routes/productRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5002;

// Middleware
app.use(cors());
app.use(express.json());

// Connect DB
connectDB();

app.get("/", (req, res) => res.send("product Service  is active "));


// Routes
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);

app.listen(PORT, () => console.log(`Product Service running on port http://localhost:${PORT}`));
