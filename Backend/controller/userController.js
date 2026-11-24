
import User from "../models/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

// GENERATE JWT
const generateToken = (id) =>{
    return jwt.sign({id}, process.env.JWT_SECRET,{expiresIn:'30d'});
}

// api to register user
export const registerUser = async (req,res)=>{
    const {name,email,password} = req.body;
    try{
        const userExits = await User.findOne({email});
        if(userExits){
            return res.json({success:false,message:"User already registered"});
        }
        const user = await User.create({name,email,password});
        const token = generateToken(user._id);
        res.json({success:true,token});
    }catch(err){
        
        return res.json({success:false,message:err.message});
    }
}

//api for login
export const loginUser = async (req,res)=>{
    const{email,password} = req.body;
    try {
        const user = await User.findOne({email});
        if(user){
            const isMatch = await bcrypt.compare(password,user.password);
            if(isMatch){
                const token = generateToken(user._id);
                return res.json({success:true,token});
            }
        }
        return res.json({success:false,message:"Invalid email and password"});
    } catch (err) {
        return res.json({success:false,message:err.message});
    }
}

//api to get user data
export const getUser = async (req,res)=>{
    try {
        const user = req.user;
        return res.json({success:true,user});
    } catch (err) {
         return res.json({success:false,message:err.message}); 
    }
}


//api to get published image
export const getPublishedImages = async (req,res)=>{
    try {
        
        
    } catch (err) {
        
    }
}

