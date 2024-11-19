import jwt from "jsonwebtoken"
import validator from "validator"
import {v2 as cloudinary} from "cloudinary"
import doctorsModel from "../models/Doctors_Nurses.js";
import patientsModel from "../models/Patients.js"
import bcrypt from "bcrypt"
import path from "path"

// api for adding doctors
const addDoctor=async (req,res)=>{
    try{
        const {name,email,password,degree,about,contact_info,address,fees,role,speciality,license_number}=req.body;
        
        const imageFile=req.file;
        
        console.log(name,email,password,degree,about,contact_info,address,role,license_number,imageFile)

        if(!name || !email  || !password || !degree || !about || !contact_info || !address || !role || !license_number){
            return res.json({success:false,message:"Missing details"})
        }

        if(!validator.isEmail(email)){
            return res.json({success:false,message:"Enter valid email"})
        }

        if (role === "Doctor" && !speciality) {
            return res.json({ success: false, message: "Specialty is required for doctors" });
        }

        if(password.length<6){
            return res.json({success:false,message:"Enter strong password (password should be of length > 6)"})
        }

        const salt=await bcrypt.genSalt(10)
        const hashedPassword=await bcrypt.hash(password,salt)

        const imageUpload=await cloudinary.uploader.upload(imageFile.path,{resource_type:"image"})
        const imageUrl=imageUpload.secure_url


        const doctorData={
            name,
            email,
            password:hashedPassword,
            image:imageUrl,
            degree,
            about,
            contact_info,
            address,
            role,
            license_number
        }

        // Conditionally add specialty if role is "Doctor"
        if (role === "Doctor") {
            doctorData.speciality = speciality;
            doctorData.speciality=fees;
        }

        const newDoctor=new doctorsModel(doctorData)
        await newDoctor.save()

        return res.json({success:true,message:"Doctor added"})
    }
    catch(error){
        console.log(error);
        return res.json({success:false,message:error.message})
    }
}


//api for admin login
const loginAdmin=async(req,res)=>{
    try{
        const {email,password}=req.body;
        if(email===process.env.ADMIN_EMAIL && password===process.env.ADMIN_PASSWORD){
            const token=jwt.sign({email},process.env.JWT_SECRET);
            return res.json({success:true,token})
        }
    }
    catch(error){
        console.log(error);
        return res.json({successs:false,message:error.message})
    }
}

//api function for getting admin dashboard data
const getDashboardData = async (req, res) => {
    try {
      
      const [doctorsCount, patientsCount, appointmentsCount] = await Promise.all([
        doctorsModel.countDocuments(),
        patientsModel.countDocuments(), 
        doctorsModel.aggregate([
          {
            $unwind: { path: "$appointments", preserveNullAndEmptyArrays: true },
          },
          {
            $group: {
              _id: null,
              totalAppointments: { $sum: 1 }, // Count all appointments
            },
          },
        ]),
      ]);
  
      const totalAppointments = appointmentsCount[0]?.totalAppointments || 0;
  
      res.status(200).json({
        doctorsCount,
        patientsCount,
        appointmentsCount: totalAppointments,
      });
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      res.status(500).json({ error: 'Failed to fetch dashboard data. Please try again.' });
    }
  };
  

  //api function to get lists of all appointments
  const getAllAppointments = async (req, res) => {
    try {
      const appointments = await doctorsModel.aggregate([
        {
          $unwind: "$appointments", 
        },
        {
          $lookup: {
            from: "patients", 
            localField: "appointments.patientId", 
            foreignField: "_id", 
            as: "patientDetails", 
          },
        },
        {
          $unwind: "$patientDetails", 
        },
        {
          $project: {
            doctorName: "$name", 
            patientName: "$patientDetails.name", 
            day: "$appointments.day",
            time: "$appointments.time", 
            status: "$appointments.status", 
          },
        },
        {
          $sort: { day: 1, time: 1 }, 
        },
      ]);
  
      if (appointments.length === 0) {
        return res.status(404).json({ message: "No appointments found." });
      }
  
      res.status(200).json({ appointments });
    } catch (error) {
      console.error("Error fetching appointments:", error);
      res.status(500).json({ error: "Failed to fetch appointments." });
    }
  };
  


export {addDoctor,loginAdmin,getDashboardData,getAllAppointments}