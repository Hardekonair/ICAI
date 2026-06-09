import express from "express"
import {login,signup,googleAuth, getMe, logout} from "../controllers/authController.js"

const router=express.Router();

router.post("/signup",signup);
router.post("/login",login);
router.post("/google",googleAuth);
router.get("/me",getMe);
router.post("/logout",logout);

export default router;