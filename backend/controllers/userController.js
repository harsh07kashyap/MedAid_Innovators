import validator from "validator"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import {v2 as cloudinary} from "cloudinary"
import mongoose from "mongoose"
import patientsModel from "../models/Patients.js";
import doctorsModel from "../models/Doctors_Nurses.js";

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


const userProfile = async (req, res) => {
    try {
      const userId = req.user.id;
      console.log(userId);
      const user = await patientsModel.findById(userId);
  
      if (!user) {
        return res.status(404).json({ success: false, message: "User not found" });
      }
      
      return res.status(200).json({ success: true, data: user });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: error.message });
    }
  };



  const bookAppointment = async (req, res) => {
    try {
      const { doctorId } = req.params;
      const {  day, time } = req.body;  // Receive 'day' and 'time' as separate fields
      const patientId = req.user.id;
  
      // Generate a unique appointment ID
      const appointmentId = new mongoose.Types.ObjectId();
  
      // Convert patientId to ObjectId
      // const patientObjectId = new mongoose.Types.ObjectId(patientId);
  
      // Find the doctor and validate the availability of the requested slot
      const doctor = await doctorsModel.findById(doctorId);
      if (!doctor) return res.status(404).json({ error: "Doctor not found" });
  
      // Check if the selected slot is available
      const isSlotAvailable = doctor.available_slots.some(slot => 
        slot.day === day && slot.time.includes(time)
      );
      if (!isSlotAvailable) {
        return res.status(400).json({ error: "Selected time slot is unavailable" });
      }
  
      // Add the appointment to the doctor's appointments
      doctor.appointments.push({
        _id: appointmentId,
        patientId: patientId,
        day,
        time,
        status: 'Pending'
      });
      await doctor.save();
  
      // Find the patient and add the same appointment
      const patient = await patientsModel.findById(patientId);
      if (!patient) return res.status(404).json({ error: "Patient not found" });
      patient.appointments.push({
        _id: appointmentId,
        doctorId: doctor._id,
        day,
        time,
        status: 'Pending'
      });
      await patient.save();
  
      res.status(200).json({ message: "Appointment request sent.", appointmentId });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  


const available_slots=async(req,res)=>{
    try {
        const { doctorId } = req.params;
        const doctor = await doctorsModel.findById(doctorId).select('available_slots');
        res.status(200).json(doctor.available_slots);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


const getDoctorData=async(req,res)=>{
  try{ 
    const {doctorId} =req.params;
    const doctor=await doctorsModel.findById(doctorId);
    res.status(200).json(doctor)

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}


// Route: Get all appointments for a specific patient
const getAllAppointments= async (req, res) => {
  const patientId= req.user.id

  try {
    // Find the patient and populate doctor details for each appointment
    const patient = await patientsModel.findById(patientId).populate({
      path: "appointments.doctorId",
      select: "name speciality contact_info" // Fetch doctor-specific fields
    });

    if (!patient) {
      return res.status(404).json({ message: "Patient not found." });
    }

    // Format the response to include relevant appointment details
    const formattedAppointments = patient.appointments.map((appointment) => ({
      doctorName: appointment.doctorId?.name || "Unknown Doctor",
      speciality: appointment.doctorId?.speciality || "Not Provided",
      contactInfo: appointment.doctorId?.contact_info || "Not Provided",
      date: appointment.day,
      time: appointment.time,
      status: appointment.status
    }));

    res.status(200).json({
      patientName: patient.name,
      appointments: formattedAppointments
    });
  } catch (error) {
    console.error("Error fetching patient appointments:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};


export {registerUser,loginUser,userProfile,bookAppointment,available_slots,getDoctorData,getAllAppointments}