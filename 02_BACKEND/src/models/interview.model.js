import mongoose from "mongoose";

const interviewSchema = new mongoose.Schema(
{
    // Owner of this interview
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"InterviewAI",
        required:true,
        index:true,
    },

    // Snapshot of the question asked
    question:{
        questionId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"InterviewAIQuestion",
            default:null
        },

        title:{
            type:String,
            required:true,
            trim:true
        },

        difficulty:{
            type:String,
            enum:["Easy","Medium","Hard"],
            required:true
        },

        type:{
            type:String,
            required:true,
            trim:true
        }
    },

    // Candidate answer
    transcript:{
        type:String,
        required:true,
        trim:true
    },

    // Recording duration (seconds)
    duration:{
        type:Number,
        required:true
    },

    // Cloudinary/ImageKit URL
    videoUrl:{
        type:String,
        required:true,
        trim:true
    },

    // Speech Statistics
    speechStats:{
        words:{
            type:Number,
            required:true
        },

        sentences:{
            type:Number,
            required:true
        },

        pace:{
            type:Number,
            required:true
        },

        fillerWords:{
            type:Number,
            required:true
        }
    },

    // Gemini Output
    analysis:{
        overallScore:{
            type:Number,
            required:true
        },

        dimensions:[
            {
                title:String,
                score:Number,
                strength:String,
                weakness:String,
                evidence:String,
                improvement:String
            }
        ],

        strengths:[
            {
                title:String,
                description:String,
                evidence:String
            }
        ],

        improvementTips:[
            {
                title:String,
                description:String,
                example:String,
                priority:String
            }
        ],

        rewrittenAnswer:String,

        framework:{
            title:String,
            description:String
        },

        overallFeedback:String
    }

},
{
    timestamps:true
});

export default mongoose.model("InterviewAISession",interviewSchema);