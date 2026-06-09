import quesModel from "../models/question.js";

export const createQuestion=async(req,res)=>{
    try{
        console.log("Saving Question");

        const {title,hint,difficulty,type}=req.body;
        // ✅ 1. Validation
        if(!title || title.trim()===""){
            return res.status(400).json({message:"Title is Mandatory"});
        }
        // Normalize title (avoid duplicates like "Two Sum" vs "two sum")
        const normalizedTitle=title.trim().toLowerCase();
        // ✅ 2. Secure userId (NEVER from frontend)
        const userId=req.user?.id || null; // Assuming auth middleware sets req.user

        // ✅ 3. Check for duplicate question by same user
        const existingQuestion=await quesModel.findOne({title: normalizedTitle,createdBy:userId});
        if(existingQuestion){
            return res.status(400).json({message:"Question with this title already exists"});
        }
        // ✅ 4. Create and Save Question
        const newQuestion= await quesModel.create({title: normalizedTitle, hint:hint?.trim(),difficulty,type,createdBy:userId});

        // ✅ 5. Return Success Response
        res.status(201).json({message:"Question created successfully", question: newQuestion});


    } catch(err){
        console.error("Error creating question:", err);
        res.status(500).json({message:"Internal server error", message: err.message});    
    }
};