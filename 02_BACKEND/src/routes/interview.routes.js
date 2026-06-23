import express from "express";
import {
  analyzeInterview
} from "../controllers/interview.controller.js";

const router = express.Router();

router.post(
  "/analyze",
  analyzeInterview
);

export default router;