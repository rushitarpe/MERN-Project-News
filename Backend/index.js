import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.route.js';
import userRoutes from './routes/user.route.js';
import cookieParser from 'cookie-parser';

dotenv.config()
mongoose.connect(process.env.MONGO_URI)
.then(() =>{ console.log("Database  Connected...")})
.catch((err)=>{
    console.log(err);
}
)
const app = express();
app.use(express.json());

app.use(cookieParser())
const port = 5000;
app.listen(port,()=>{
    console.log(`Server is running on port ${port}.!`);
}
)
app.use("/api/auth",authRoutes)
app.use("/api/user",userRoutes)

app.use((err,req,res,next) =>{
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error!'
    res.status(statusCode).json({
        success:false,
        statusCode,
        message,
    })
})