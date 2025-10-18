import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js'; 
import orderRoutes from './routes/orderRoutes.js';
import paymentRoutes from './routes/paymentRoutes.js';

dotenv.config();

//MongoDB connection
connectDB();

const app = express();
const PORT = process.env.PORT || 5004;

//middleware
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => res.send("order Service is active "));

//routes
app.use('/api/orders', orderRoutes);
app.use('/api/payments',paymentRoutes)

app.listen(PORT, () => {
    console.log(`🚀 Order Service running on port http://localhost:${PORT}`);
});
