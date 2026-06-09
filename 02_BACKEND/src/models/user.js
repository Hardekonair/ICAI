import mongoose, { Schema } from "mongoose";

const userSchema=new mongoose.Schema({
    name:{type:String,required:true,trim:true},
    email:{type:String,required:true,unique:true,lowercase:true},
    password:{type:String,required:function(){return !this.googleId}},
    // these two fields are not must
    googleId:{type:String,default:null},
    avatar:{type:String}
},{timestamps:true});

const userModel=mongoose.model("InterviewAI",userSchema);

export default userModel;

// ⏱️ timestamps: true
// { timestamps: true }
// ✅ What it does

// Automatically adds 2 fields:

// {
//   createdAt: "2026-04-16T10:00:00.000Z",
//   updatedAt: "2026-04-16T10:05:00.000Z"
// }
// 🔍 Example

// When user is created:

// {
//   name: "Hardik",
//   email: "hardik@gmail.com",
//   createdAt: "2026-04-16T10:00:00Z",
//   updatedAt: "2026-04-16T10:00:00Z"
// }

// When user updates profile:

// updatedAt: "2026-04-16T10:10:00Z"
// 💡 Why this matters

// You can:

// 🧾 Show "Account created on..."
// 🔐 Detect suspicious activity
// 📊 Sort users by newest
// 🛠 Debug issues
// ⏳ Track last update time