import express from "express";
import roleMiddleware from "../middlewares/roleMiddleware.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import { getDoctorsBySpecialty, loginDoctorOrNurse,respondAppointment,getDoctorAppointments } from "../controllers/doctorController.js";

const doctorRouter = express.Router();

// Route for doctors login
doctorRouter.post("/login",loginDoctorOrNurse );

// Route accessible only to Doctors for managing appointments
doctorRouter.patch("/appointments/manage/:doctorId/:appointmentId", authMiddleware, roleMiddleware("Doctor"), respondAppointment);

doctorRouter.get("/allDoctors",getDoctorsBySpecialty)


doctorRouter.get("/appointments",authMiddleware, roleMiddleware("Doctor"),getDoctorAppointments)

export default doctorRouter