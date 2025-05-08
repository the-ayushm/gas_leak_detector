import dotenv from 'dotenv'
dotenv.config();
import express from 'express'


// console.log("JWT_SECRET from .env:", process.env.JWT_SECRET);

import authRoutes from './routes/auth.routes.js' 
import connectToMongoDb from './db/connectToDB.js'
import cookieParser from 'cookie-parser';
import cors from "cors";
const app = express();

const PORT  = process.env.PORT || 5000

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));
app.use(express.json())
app.use(cookieParser()) 
app.use("/api/auth" , authRoutes)
 
app.listen(PORT, () => {
  connectToMongoDb()
  console.log(`Server is running on http://localhost:${PORT}`)
  
}) 