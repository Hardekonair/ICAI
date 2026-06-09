import userModel from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
// import axios from "axios";  //Used to make HTTP request to Google API
import { oauth2client } from "../utils/googleConfig.js"; 

export const signup = async(req,res)=>{
    try{
        console.log("signup started\n");
        const{name,email,password}=req.body;

        if(!name || !email || !password){
            return res.status(400).json({message: "All fields are required"});  //Backend validation = Security
        }
        
        const existingUser=await userModel.findOne({email})
        if(existingUser){
            return res.status(400).json({message:"User already Exist"});
        }

        const hashedpass=await bcrypt.hash(password,10);

        const user=await userModel.create({
            name,
            email,
            password:hashedpass
        });

        const token=jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:'7d'});
        res.cookie("token",token, {
            httpOnly:true,      //httpOnly → prevents JS access (security)
            secure:false,       // secure → HTTPS only (prod)- if true
            sameSite:"lax"      // sameSite → prevents Cross-Site Request Forgery (CSRF) 
        });

        res.status(201).json({
            message:"User Registered Successfully",
            
        })
    }catch(err){
        console.error(err);
        res.status(500).json({message:"Server Error"})
    }
};

export const login=async (req,res)=>{
    try{
        console.log("login started\n");
        // const existingToken=req.cookies.token;
        // if(existingToken){
        //     try{
        //         const decoded=jwt.verify(existingToken,process.env.JWT_SECRET);
        //         console.log("User already Logged In")
        //         return res.status(400).json({message:"User already Signed In"})
        //     }catch(err){
        //         console.log("Token Expired, Please Login Again!")
        //         return res.status(400).json({message:"Token Expired, Please Login Again!"});
        //     }
        // }

        const{email,password}=req.body;

        const user=await userModel.findOne({email});
        if(!user){
            console.log("User Not Exist");
            return res.status(400).json({message:"User Not Exist"});}

        const isMatch=await bcrypt.compare(password,user.password);

        if(!isMatch){
            console.log("INcorrect Password");
            return res.status(400).json({message:"Wrong Password"});
        }

        const token=jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:"7d"});
        res.cookie("token",token, {
            httpOnly:true,      //httpOnly → prevents JS access (security)
            secure:false,       // secure → HTTPS only (prod)- if true
            sameSite:"lax"      // sameSite → prevents Cross-Site Request Forgery (CSRF) 
        });

        res.status(200).json({
            message:"User LoggedIn Successfully",
        })
    }
    catch(err){
        console.log("Actual Error:", err); // 🔥 VERY IMPORTANT
        res.status(500).json({message:"Server Error"});
    }
};

export const googleAuth = async (req,res)=>{    //Used to make HTTP request to Google API, Called when frontend hits: POST /auth/google
    try{
        console.log("google auth started\n");

        const {token}=req.body;     //This is NOT user data, only a temporary token

        // 🔥 Get user data from Google using Axios, THIS IS FIXED METHOD TO EXTRACT EMAIL,PASS, PROFILE ETC
        // const googleRes = await axios.get(
        //     "https://www.googleapis.com/oauth2/v3/userinfo",
        //     {headers:{Authorization:`Bearer ${token}`}      //This sends token securely,Google verifies it and returns user data 
        // })
        // const data=googleRes.data;      //Axios stores actual response inside .data
        // const{sub,email,name,picture}=data;

        const ticket=await oauth2client.verifyIdToken({
            idToken:token,
            audience:process.env.GOOGLE_CLIENT_ID,
        });

        const payload = ticket.getPayload();

        const {sub,email,name,picture,email_verified}=payload;

        // Extra Safety Check
        if(!email_verified){
            return res.status(400).json({message:"Email Not Verified"});
        }

        let user = await userModel.findOne({email});
        if(!user){
            user=await userModel.create({email,name,googleId:sub,avatar:picture,password:null});
        }
        // 🔗 Optional: 👉 Case: User signed up manually before Now logs in via Google
        if(user && !user.googleId){
            user.googleId=sub;
            await user.save();  //Link both accounts together 🔗
        }

        //Genereate JWT
        const jwtToken=jwt.sign({id:user._id},process.env.JWT_SECRET);

        res.cookie("token",jwtToken);

        res.status(200).json({
            message:"Google Login Successfull",
            token:jwtToken,
            user:{
                id:user._id,
                email:user.email,
                name:user.name,
                avatar:user.avatar
            }
        });

    }catch(err){
        console.log("Google Auth Error: ",err.response?.data || err.message);
        res.status(500).json({message:"server Error"});
    }
};

export const getMe = async (req, res) => {
  try {
    // 🔥 Get token from cookie
    const token = req.cookies.token;
    console.log("getMe token:", token); // 🔥 DEBUG: Check if token is received
    if (!token) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    // 🔐 Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 🧠 Get user from DB
    const user = await userModel.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // ✅ Send user
    res.status(200).json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
      },
    });

  } catch (err) {
    console.log("GET ME ERROR:", err.message);
    res.status(401).json({ message: "Invalid or expired token" });
  }
};

export const logout = async (req,res)=>{
    try{
        res.clearCookie("token",{
            httpOnly:true,      //httpOnly → prevents JS access (security)
            secure:false,       // secure → HTTPS only (prod)- if true
            sameSite:"lax"      // sameSite → prevents Cross-Site Request Forgery (CSRF) 
        });
        return res.status(200).json({message:"Logged Out Successfully"});
    }
    catch(err){
        return res.status(500).json({message:"Something went wrong"})
    }
};