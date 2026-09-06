import express from "express";
import { getDashboard } from "../controllers/dashboardController.js";
import verifyUser from "../middleware/authMiddleware.js";

const router = express.Router();

// router.get("/", getDashboard);
router.get("/",verifyUser,getDashboard);

export default router;