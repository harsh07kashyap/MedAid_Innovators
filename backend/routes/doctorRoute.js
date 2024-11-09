import express from "express";
import roleMiddleware from "../middlewares/roleMiddleware.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import { loginDoctorOrNurse,respondAppointment } from "../controllers/doctorController.js";

const doctorRouter = express.Router();

// Route for doctors login
doctorRouter.post("/login",loginDoctorOrNurse );

// Route accessible only to Doctors for managing appointments
doctorRouter.patch("/appointments/manage/:doctorId/:appointmentId", authMiddleware, roleMiddleware("Doctor"), respondAppointment);

export default doctorRouter