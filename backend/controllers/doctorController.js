import jwt from "jsonwebtoken"
// import {v2 as cloudinary} from "cloudinary"
import doctorsModel from "../models/Doctors_Nurses.js";
import bcrypt from "bcrypt"
import path from "path"


//api for doctor login
const loginDoctorOrNurse=async(req,res)=>{
    try {
        const { email, password } = req.body;
    
        // Find the doctor by email
        const doctor = await doctorsModel.findOne({ email });
        if (!doctor) {
          return res.status(404).json({ success: false, message: "Doctor not found" });
        }
    
        // Check if the password is correct
        const isMatch = await bcrypt.compare(password, doctor.password);
        if (!isMatch) {
          return res.status(400).json({ success: false, message: "Invalid credentials" });
        }
    
        // Generate JWT token
        const token = jwt.sign(
          { id: doctor._id, email: doctor.email }, // Payload
          process.env.JWT_SECRET, // Secret key
        );
    
        // Return token and doctor details (excluding sensitive data)
        res.json({
          success: true,
          token,
          doctor: {
            id: doctor._id,
            name: doctor.name,
            email: doctor.email,
            role: doctor.role,
            image: doctor.image,
            degree: doctor.degree,
            about: doctor.about,
            contact_info: doctor.contact_info,
            address: doctor.address,
            available: doctor.available,
            slots_booked: doctor.slots_booked,
            fees: doctor.fees,
          },
        });
      } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server error" });
      }
}


export {loginDoctorOrNurse}