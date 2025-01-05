import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.route.js';

dotenv.config()
mongoose.connect(process.env.MONGO_URI)
.then(() =>{ console.log("Database  Connected...")})
.catch((err)=>{
    console.log(err);
}
)
const app = express();
app.use(express.json());
app.use("/api/auth",authRoutes)

const port = 5000;
app.listen(port,()=>{
    console.log(`Server is running on port ${port}.!`);
}
)