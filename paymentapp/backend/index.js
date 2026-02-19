import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import { connectDB } from './config/connectdb.js';
import userRoutes from './routes/userRoutes.js';
import accountRoutes from './routes/accontRoutes.js'
import cors from 'cors';








const app = express();


connectDB()

app.use(express.json())
app.use(cors())





app.use("/api/v1/users",userRoutes)
app.use("/api/v1/accounts",accountRoutes)

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
