import express from "express";
import authRoutes from "./routes/auth.js"
import questionRoutes from "./routes/question.js"
import cors from "cors"
import cookieParser from "cookie-parser"
// console.log("CLIENT_URL55:", process.env.PORT);
const app=express();
app.use(cors({
    // origin:'http://localhost:5173',
    origin:process.env.CLIENT_URL,
    credentials:true
}));
app.use(express.json());
app.use(cookieParser());


app.use("/api/auth",authRoutes);
app.use("/api",questionRoutes)
export default app;