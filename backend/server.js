import express from "express"
import cors from "cors"
import 'dotenv/config'
import connectDB from "./config/mongodb.js"
import connectCloudinary from "./config/cloudinary.js"
import { connect } from "mongoose"
import adminRouter from "./routes/adminRoute.js"
import userRouter from "./routes/userRoute.js"

const app=express()
const port=process.env.PORT || 4000
connectDB()
connectCloudinary()


//middlewares
app.use(express.json())
app.use(cors())

//api endpoints
//Harsh9234
//     mongodb+srv://kashyap7harsh:<db_password>@cluster2.d6n8c.mongodb.net/

app.use('/api/admin',adminRouter)  //api to admin login
app.use('/api/user',userRouter)    //api to patient sign-up

app.get('/',(req,res)=>{
    res.send("Api working")
})

app.listen(port,()=>console.log("Server started",port))