import express from "express"
import { addDoctor,loginAdmin,getDashboardData,getAllAppointments} from "../controllers/adminController.js"
import upload from "../middlewares/multer.js"
import authMiddleware from "../middlewares/authMiddleware.js"
import roleMiddleware from "../middlewares/roleMiddleware.js"

const adminRouter=express.Router()

//admin can add doctors/nurses
adminRouter.post('/add-doctor',authMiddleware,roleMiddleware("Admin"),upload.single('image'),addDoctor)

//admin-login
adminRouter.post('/login',loginAdmin)

//api to get dashboard-data
adminRouter.get("/dashboard-data",authMiddleware,roleMiddleware("Admin"),getDashboardData)

//api to get list all appointments
adminRouter.get('/getAllAppointments',authMiddleware,roleMiddleware("Admin"),getAllAppointments)

export default adminRouter