import mongoose,{ Schema } from "mongoose";

const quesSchema=new mongoose.Schema({
    title:{type:String,required:true,trim:true},
    hint:{type:String,trim:true},
    difficulty:{type:String,enum:["Easy","Medium","Hard"],default:"Medium",trim:true},
    type:{type:String,trim:true},

    createdBy:{type:mongoose.Schema.Types.ObjectId,
               ref:"InterviewAI",
               default:null,    //null=Global
              }
},{timestamps:true});

const quesModel=mongoose.model("InterviewAIQuestion",quesSchema);

export default quesModel;
