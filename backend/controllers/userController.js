import validator from "validator"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import {v2 as cloudinary} from "cloudinary"
import patientsModel from "../models/Patients.js";

// api function to register(sign-up) patient/user
const registerUser=async(req,res)=>{
    try{
        const {name,email,password}=req.body
        if(!name || !password || !email){
            return res.json({success:false,message:"Missing details"})
        }
        
        if(!validator.isEmail(email)){
            return res.json({success:false,message:"Enter valid email"})
        }

        if(password.length<6){
            return res.json({success:false,message:"Enter strong password (password should be of length > 6)"})
        }

        const salt=await bcrypt.genSalt(10)
        const hashedPassword=await bcrypt.hash(password,salt)

        const userData={
            name,
            email,
            password:hashedPassword
        }
        const newUser=new patientsModel(userData)
        const user=await newUser.save()

        const token=jwt.sign({id:user._id},process.env.JWT_SECRET);
        return res.json({success:true,token})
    }
    catch(error){
        console.log(error);
        return res.json({successs:false,message:error.message})
    }
}

 
//api function for patient(user) login:
const loginUser=async(req,res)=>{
    try{
        const {email,password}=req.body
        const user=await patientsModel.findOne({email})

        if(!user) return res.json({success:false,message:"User does not exist"})
        const isMatch=await bcrypt.compare(password,user.password)
        if(isMatch){
            const token=jwt.sign({id:user._id},process.env.JWT_SECRET)
            return res.json({success:true,token})
        }else{
            return res.json({success:false,message:"Invalid credentials"})
        }
    }

    catch(error){
        console.log(error);
        res.json({successs:false,message:error.message})
    }
}

export {registerUser,loginUser}