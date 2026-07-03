// import dotenv from "dotenv";
// dotenv.config();

// import { GoogleGenerativeAI } from "@google/generative-ai";

// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// async function testGemini() {
//     try{

//         const model = genAI.getGenerativeModel({
//             model:"gemini-2.5-flash"
//         });

//         const result = await model.generateContent("Say Hello in one sentence with additional greetings");

//         const response = await result.response;

//         const text = response.text();

//         console.log(text);
//     }
//     catch(error){
//         console.error(error);
//     }
// }

// testGemini();

import dotenv from "dotenv";
dotenv.config();

import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});

async function testGemini() {
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: "Say hello in one sentence.",
        });

        console.log(response.text);
    } catch (error) {
        console.error(error);
    }
}

testGemini();