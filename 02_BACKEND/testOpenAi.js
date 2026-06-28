import dotenv from "dotenv";
dotenv.config();

import OpenAI from "openai";

const client = new OpenAI({apiKey: process.env.OPENAI_API_KEY});

async function testOpenAi() {
    try{

        const model = await client.chat.completions.create({
            model:"gpt-4o-mini",

            messages: [
                {
                    role:"user",
                    content:"Say hello in one sentence with additional greetings"
                }
            ]
        });

        console.log(model.choices[0].message.content);
    }
    catch(error){
        console.error(error);
    }
}

testOpenAi();