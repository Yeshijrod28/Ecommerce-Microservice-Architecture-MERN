import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import userRoutes from './routes/userRoute.js';
import authRoutes from './routes/authRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());

// Connect DB
connectDB();

// Routes
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);

app.get("/", (req, res) => res.send("user Service  is active "));

app.listen(PORT, () => console.log(`User Service running on port http://localhost:${PORT}`));
