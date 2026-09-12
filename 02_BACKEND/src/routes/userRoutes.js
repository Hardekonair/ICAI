import express from "express";

import { changePassword, getCurrentUser, updateCurrentUser } from "../controllers/userController.js";
import verifyUser from "../middleware/authMiddleware.js";

const router = express.Router();

router.get(
    "/me",
    verifyUser,
    getCurrentUser
);

router.patch(
    "/me",
    verifyUser,
    updateCurrentUser
);

router.post(
    "/change-password",
    verifyUser,
    changePassword
);

export default router;