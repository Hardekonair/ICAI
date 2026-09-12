import path from "path";
import { fileURLToPath } from "url";
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
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/user", userRoutes);
app.use("/api/email-verification", emailVerificationRoutes);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// React SPA fallback

app.use((req, res, next) => {
    if (req.method !== "GET") {
        return next();
    }

    if (req.path.startsWith("/api")) {
        return next();
    }

    res.sendFile(path.join(__dirname, "../public/index.html"));
});
export default app;