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

const App = () => {
  const {aToken} = useContext(AdminContext)
  return  aToken ?(
    <div className='bg-[#F8F9FD]'> 
     <ToastContainer/>
     <Navbar/>
     <div className='flex items-start'>
      <Sidebar/>
      <Routes>
        <Route path="/" element={<></>} />
        <Route path="/admin-dashboard" element={<Dashboard />} />
        <Route path="/add-doctor" element={<AddDoctor/>} />
        <Route path="/doctor-list" element={<DoctorsList/>} />
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