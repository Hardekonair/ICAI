import express from "express";
import authRoutes from "./routes/auth.js"
import questionRoutes from "./routes/question.routes.js"
import interviewRoutes from "./routes/interview.routes.js"
import dashboardRoutes from "./routes/dashboard.routes.js";
import userRoutes from "./routes/userRoutes.js";
import emailVerificationRoutes from "./routes/emailVerificationRoutes.js";

import cors from "cors"
import cookieParser from "cookie-parser"
// console.log("CLIENT_URL55:", process.env.PORT);
const app=express();
app.use(express.static("public"))
app.use(cors({
    // origin:'http://localhost:5173',
    origin:process.env.CLIENT_URL,
    credentials:true
}));
app.use(express.json());
app.use(cookieParser());


app.use("/api/auth",authRoutes);
app.use("/api",questionRoutes);
app.use("/api/interview",interviewRoutes);
app.use("/api/homepage", dashboardRoutes);
app.use("/api/user", userRoutes);
app.use("/api/email-verification", emailVerificationRoutes);
export default app;