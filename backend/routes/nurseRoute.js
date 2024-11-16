import express from "express";
import upload from "../middlewares/multer.js"
import roleMiddleware from "../middlewares/roleMiddleware.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import { loginDoctorOrNurse } from "../controllers/doctorController.js";
import { getAllPatients,updatePatientData, uploadLabResults,searchPatientByName } from "../controllers/nurseController.js";

const nurseRouter = express.Router();

// Route for doctors login
nurseRouter.post("/login",loginDoctorOrNurse );

  //Route to get list of all patients
nurseRouter.get("/allPatients", authMiddleware, roleMiddleware("Nurse"), getAllPatients);

//Route to update patient-data
nurseRouter.patch("/updatePatientData/:patientId", authMiddleware, roleMiddleware("Nurse"), updatePatientData);

// Route to upload lab result
nurseRouter.post('/lab-results',authMiddleware, roleMiddleware("Nurse"),upload.single('lab_result_image'),uploadLabResults);

// Search patients by name (case-insensitive)
nurseRouter.get('/patients/search', authMiddleware, roleMiddleware("Nurse"),searchPatientByName );

  export default nurseRouter