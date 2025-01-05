import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config()
mongoose.connect(process.env.MONGO_URI)
.then(() =>{ console.log("Database  Connected...")})
.catch((err)=>{
    console.log(err);
}
)
const app = express();
const port = 5000;
app.listen(port,()=>{
    console.log(`Server is running on port ${port}.!`);
}
)