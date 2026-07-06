import express from "express"
import { createQuestion, getQuestions } from "../controllers/quesController.js";

const router=express.Router();

router.post("/questions",createQuestion);
router.get("/questions", getQuestions);

export default router;