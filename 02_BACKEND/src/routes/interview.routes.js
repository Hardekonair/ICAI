import express from "express";

import {
  analyzeInterview,
  saveInterview, getInterviewSession
} from "../controllers/interview.controller.js";
import upload from "../middleware/upload.middleware.js";

import verifyUser from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/analyze",analyzeInterview);
// router.post("/save",upload.single("video"),saveInterview);
router.post(
    "/save",
    verifyUser,
    upload.single("video"),
    saveInterview
);
router.get(
    "/:sessionId",
    verifyUser,
    getInterviewSession
);

export default router;