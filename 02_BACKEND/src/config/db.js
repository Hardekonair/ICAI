import mongoose from "mongoose";

async function connectDB() {
    try{
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Database Connected Successfully");
    }catch(err){
        console.log("Database Connection Error",err);
    }
}
export default connectDB;