import express from "express";
import roleMiddleware from "../middlewares/roleMiddleware.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import { loginDoctorOrNurse } from "../controllers/doctorController.js";

const doctorRouter = express.Router();

// Route for doctors login
doctorRouter.post("/login",loginDoctorOrNurse );

// Route accessible only to Doctors
doctorRouter.get("/doctor-data", authMiddleware, roleMiddleware("Doctor"), (req, res) => {
    res.json({ message: "This data is only accessible to Doctors" });
  });

  export default doctorRouter