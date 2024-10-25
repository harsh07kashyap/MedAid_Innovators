import express from "express"
import { addDoctor,loginAdmin } from "../controllers/adminController.js"
import upload from "../middlewares/multer.js"
import authAdmin from "../middlewares/authadmin.js"

const adminRouter=express.Router()

//admin can add doctors/nurses
adminRouter.post('/add-doctor',authAdmin,upload.single('image'),addDoctor)

//admin-login
adminRouter.post('/login',loginAdmin)

export default adminRouter