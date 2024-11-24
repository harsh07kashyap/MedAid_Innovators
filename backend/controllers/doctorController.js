import jwt from "jsonwebtoken"
// import {v2 as cloudinary} from "cloudinary"
import mongoose from "mongoose"
import patientsModel from "../models/Patients.js";
import doctorsModel from "../models/Doctors_Nurses.js";
import labResultsModel from "../models/LabResults.js"
import bcrypt from "bcrypt"
import path from "path"
import nodemailer from "nodemailer"


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
          { id: doctor._id, email: doctor.email,role:doctor.role }, // Payload
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
            // available: doctor.available,
            // slots_booked: doctor.slots_booked,
            fees: doctor.fees,
          },
        });
      } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server error" });
      }
}

const respondAppointment = async (req, res) => {
  try {
    const { doctorId, appointmentId } = req.params;
    const { status } = req.body;

    console.log("RespondAppointment function triggered");
    // console.log("Appointment ID:", appointmentId);
    // console.log("New Status:", status);

    // Update appointment status in doctor's record
    const doctor = await doctorsModel.findById(doctorId);
    if (!doctor) {
      console.error("Doctor not found");
      return res.status(404).json({ message: "Doctor not found." });
    }

    const appointment = doctor.appointments.id(appointmentId);
    if (!appointment) {
      console.error("Appointment not found in doctor's record");
      return res.status(404).json({ message: "Appointment not found in doctor's record." });
    }
    

    appointment.status = status;
    await doctor.save();

    // Update appointment status in patient's record
    const patient = await patientsModel.findById(appointment.patientId);
    if (!patient) {
      console.error("Patient not found");
      return res.status(404).json({ message: "Patient not found." });
    }

    const patientAppointment = patient.appointments.find(app => app._id.equals(appointmentId));
    if (!patientAppointment) {
      console.error("Appointment not found in patient's record");
      return res.status(404).json({ message: "Appointment not found in patient's record." });
    }

    patientAppointment.status = status;
    await patient.save();

    // Send email notification to the patient
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: "tradebhakt07@gmail.com", // Doctor's email
        pass: process.env.APP_PASSWORD, // Doctor's plain password (or App Password if 2FA is enabled)
      },
    });

    const mailOptions = {
      from: "tradebhakt07@gmail.com",
      to: patient.email,
      subject: `Appointment ${status}`,
      text: `Dear ${patient.name},\n\nYour appointment with ${doctor.name} has been ${status.toLowerCase()}.\n\nThank you,\n${doctor.name}`,
    };

    // Send email and handle any errors
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error: ', error);
      } else {
        console.log('Email sent: ', info.response);
      }
    });


    console.log("Appointment status updated successfully");
    res.status(200).json({ message: `Appointment ${status.toLowerCase()} successfully.` });
  } catch (error) {
    console.error("Error updating appointment:", error);
    res.status(500).json({ error: error.message });
  }
};


const getDoctorAppointments = async (req, res) => {
  try {
    
    const doctorId = req.user.id;
    const doctor = await doctorsModel.findById(doctorId).populate({
      path: 'appointments.patientId',
      select: 'name',
    });

    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    const appointments = doctor.appointments.map((appointment) => ({
      doctorId:doctorId,
      _id: appointment._id,
      patientId: appointment.patientId,
      patientName: appointment.patientId?.name || 'Unknown',
      day: appointment.day,
      time: appointment.time,
      status: appointment.status,
    }));

    res.status(200).json({ appointments });
  } catch (error) {
    console.error('Error fetching appointments:', error);
    res.status(500).json({ error: 'Server error while fetching appointments' });
  }
};



const getDoctorsBySpecialty = async (req, res) => {
  try {
      // Fetch all doctors with role "Doctor"
      const doctors = await doctorsModel.find({ role: "Doctor" });

      // Organize doctors by specialty
      const doctorsBySpeciality = doctors.reduce((acc, doctor) => {
          const speciality = doctor.speciality || 'General';
          if (!acc[speciality]) {
              acc[speciality] = [];
          }
          acc[speciality].push(doctor);
          return acc;
      }, {});

      return res.json({ success: true, data: doctorsBySpeciality });
  } catch (error) {
      console.error(error);
      return res.status(500).json({ success: false, message: error.message });
  }
};

const patientData=async (req,res)=>{
  try {
    const {patientId} = req.params;
    console.log(patientId);
    const user = await patientsModel.findById(patientId);

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    
    return res.status(200).json({ success: true, data: user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
}


const getPatientLabReports = async (req, res) => {
  try {
    const { patientId } = req.params;

    if (!patientId) {
      return res.status(400).json({ error: "Patient ID is required." });
    }

    // Fetch all lab reports for the given patient ID
    const labReports = await labResultsModel
      .find({ patient_id: patientId })
      .populate("nurse_id", "name email") // Populate nurse details
      .sort({ date: -1 }); // Sort by most recent first

    if (!labReports || labReports.length === 0) {
      return res.status(404).json({ message: "No lab reports found for this patient." });
    }

    res.status(200).json({
      message: "Lab reports fetched successfully.",
      labReports: labReports.map(report => ({
        test_name: report.test_name,
        result: report.result,
        image_url: report.image_url,
        date: report.date,
        additional_notes: report.additional_notes,
        technician_name: report.technician_name,
        nurse_name: report.nurse_id?.name || "Unknown", // Nurse name
        nurse_email: report.nurse_id?.email || "Unknown" // Nurse email
      }))
    });
  } catch (error) {
    console.error("Error fetching lab reports:", error);
    res.status(500).json({ error: "An internal server error occurred." });
  }
};

export {loginDoctorOrNurse,respondAppointment,getDoctorsBySpecialty,getDoctorAppointments,patientData,getPatientLabReports}