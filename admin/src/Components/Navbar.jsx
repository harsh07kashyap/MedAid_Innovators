import React, { useContext } from 'react'
import { AdminContext } from '../Context/AdminContext'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import styles from "../Pages/admin/Dashboard.module.css"
import { DoctorContext } from '../Context/DoctorContext'

const Navbar = () => {
  const {aToken, setAToken} = useContext(AdminContext)
  const {dToken,setDToken,setRole,role}=useContext(DoctorContext)
  const navigate = useNavigate()

  const logout = () => {
    if (aToken) {
      setAToken('');
      localStorage.removeItem('aToken');
    }
    
    if (dToken) {
      setDToken('');
      localStorage.removeItem('dToken');
      setRole(''); // Clear role when logging out from doctor/nurse
    }
  
    navigate('/'); // Redirect to the homepage after clearing tokens
  };


  return (
    <div className='flex justify-between items-center px-4 sm:px-10 py-3 border-b bg-white'>
      <div className='flex items-center gap-2 text-xs'>
      <a className={`${styles.myClass} navbar-brand`} href="#">
                <i className="bi bi-flower1"></i>
                MedAid
      </a>
      <p className='border px-2.5 py-0.5 rounded-full border-gray-500 text-gray-600'>
      {/* {aToken ? 'Admin': 'Doctor'} */}
      {aToken && "Admin"}
      {dToken && (role==="Doctor" &&("Doctor"))}
      {dToken && (role==="Nurse" &&("Nurse"))}
      </p>
      </div>
      <button className='bg-primary text-white text-sm px-10 py-2 round-full' onClick={logout} >Logout</button>
    </div>
  )
}

export default Navbar