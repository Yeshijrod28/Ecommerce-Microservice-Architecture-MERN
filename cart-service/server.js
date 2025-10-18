import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cartRoutes from './routes/cartRoute.js';
import { errorHandler } from './middleware/middleware.js';
import { connectDB } from './config/db.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5003;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
connectDB();

app.get("/", (req, res) => res.send("Cart Service 🛒 is active "));

// Routes
app.use('/api/cart', cartRoutes);

app.use(errorHandler)

// Start the server
app.listen(PORT, () => {
    console.log(`Cart Service running on port http://localhost:${PORT}`);
});
