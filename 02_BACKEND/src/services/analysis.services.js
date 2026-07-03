import { GoogleGenerativeAI }
from "@google/generative-ai";
import { buildInterviewPrompt } from "../prompt/interview.prompt.js";
const genAI =
  new GoogleGenerativeAI(
    process.env.GEMINI_API_KEY
  );

const model =
  genAI.getGenerativeModel({
    model: "gemini-2.5-flash"
  });

export const generateInterviewAnalysis =
async ({ question,transcript,speechStats }) => {
    const prompt = buildInterviewPrompt({question,transcript,speechStats});

      const result = await model.generateContent(prompt);

      const response =
        await result.response;

      const text = response.text();

      console.log("RAW GEMINI RESPONSE");
      console.log(text);

      const cleaned = text
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();

      const analysis = JSON.parse(cleaned);

      console.log("PARSED ANALYSIS");
      console.log(analysis);

      return analysis;

};