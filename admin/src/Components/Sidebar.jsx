import React from 'react'
import { useContext,useEffect } from 'react'
import { AdminContext } from '../Context/AdminContext'
import {NavLink} from "react-router-dom"
import { DoctorContext } from '../Context/DoctorContext'
import styles from "./Sidebar.module.css"

const Sidebar = () => {
  const {aToken}=useContext(AdminContext)
  const {dToken,role}=useContext(DoctorContext)

  // useEffect(() => {
  //   if (dToken) {
  //     try {
        
  //     } catch (error) {
  //       console.error("Failed to parse token:", error);
  //     }
  //   }
  // }, [dToken]);

  return (
    <div className={`min-h-screen bg-white border-r`}>
      {
        aToken && <ul className='text-[#515151] mt-5'>
          <NavLink className={({isActive})=>`flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary': ''}`} to={"/dashboard"}>
            <img src="" alt=""/>
            <p className={styles.para}>Dashboard</p>
          </NavLink>
          <NavLink className={({isActive})=>`flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary': ''}`} to={"/add-doctor"}>
            <img src="" alt=""/>
            <p className={styles.para}>Add Doctors</p>
          </NavLink>
          <NavLink className={({isActive})=>`flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary': ''}`} to={"/add-nurse"}>
            <img src="" alt=""/>
            <p className={styles.para}>Add Nurses</p>
          </NavLink>
          <NavLink className={({isActive})=>`flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary': ''}`} to={"/doctor-list"}>
            <img src="" alt=""/>
            <p className={styles.para}>Doctors List</p>
          </NavLink>
        </ul>
      }
      {dToken && (
        <ul className='text-[#515151] mt-5'>
          {/* Show links for doctors */}
          {role === 'Doctor' && (
            <>
              <NavLink 
                className={({ isActive }) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''}`} 
                to={"/manage-appointments"}>
                <img src="" alt=""/>
                <p className={styles.para}>Manage Appointments</p>
              </NavLink>
              <NavLink 
                className={({ isActive }) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''}`} 
                to={"/doctor-list"}>
                <img src="" alt=""/>
                <p className={styles.para}>Doctors List</p>
              </NavLink>
            </>
          )}

          {/* Show links for nurses */}
          {role === 'Nurse' && (
            <>
              <NavLink 
                className={({ isActive }) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''}`} 
                to={"/allPatients"}>
                <img src="" alt=""/>
                <p className={styles.para}>Nurse Dashboard</p>
              </NavLink>
              <NavLink 
                className={({ isActive }) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''}`} 
                to={"/doctor-list"}>
                <img src="" alt=""/>
                <p className={styles.para}>Doctors List</p>
              </NavLink>
              <NavLink 
                className={({ isActive }) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''}`} 
                to={"/uploadLabResults"}>
                <img src="" alt=""/>
                <p className={styles.para}>Laboratory Results</p>
              </NavLink>
            </>
          )}
        </ul>
      )}
    </div>
  )
}

export default Sidebar