import express from "express";
import { sendPasswordChangeOTP, sendSignupOTP, verifyPasswordChangeOTP, verifySignupOTP } from "../controllers/emailVerificationController.js";
import verifyUser from "../middleware/authMiddleware.js";

const router = express.Router();

router.post(
    "/password/send-otp",
    verifyUser,
    sendPasswordChangeOTP
);

router.post(
    "/password/verify-otp",
    verifyUser,
    verifyPasswordChangeOTP
);

// =============================
// SIGNUP EMAIL VERIFICATION
// =============================

router.post(
    "/signup/send-otp",
    sendSignupOTP
);

router.post(
    "/signup/verify-otp",
    verifySignupOTP
);

export default router;