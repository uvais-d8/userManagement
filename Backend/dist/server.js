import express from "express";
import userRoute from './routes/userRoute.js';
import cors from 'cors';
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import adminRoute from './routes/adminRoutes.js';
dotenv.config();
connectDB();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use('/api/users', userRoute);
app.use('/api/admin', adminRoute);
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log("Server running on port 5001");
});
