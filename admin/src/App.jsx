import React, { useContext } from 'react'
import Login from './Pages/Login'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AdminContext } from './Context/AdminContext';
import Navbar from './Components/Navbar';
import Sidebar from './Components/Sidebar';
import {Routes,Route} from "react-router-dom"
import Dashboard from "./Pages/admin/Dashboard"
import AddDoctor from "./Pages/admin/AddDoctor"
import DoctorsList from "./Pages/admin/DoctorsList"
import { DoctorContext } from './Context/DoctorContext';
import ManageAppointments from "./Pages/doctor/ManageAppointments"
import AddNurse from "./Pages/admin/AddNurse"

const App = () => {
  const {aToken} = useContext(AdminContext)
  const {dToken} =useContext(DoctorContext)
  return  aToken || dToken ?(
    <div className='bg-[#F8F9FD]'> 
     <ToastContainer/>
     <Navbar/>
     <div className='flex items-start'>
      <Sidebar/>
      <Routes>
        {/* admin routes */}
        <Route path="/" element={<></>} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/add-doctor" element={<AddDoctor/>} />
        <Route path="/add-nurse" element={<AddNurse/>} />
        <Route path="/doctor-list" element={<DoctorsList/>} />
        
        <Route path="/manage-appointments" element={<ManageAppointments/>} />
      </Routes>
     </div>
    </div>
  ):(
    <div>
     <Login/> 
     <ToastContainer/>      
    </div>
  )
}

export default App