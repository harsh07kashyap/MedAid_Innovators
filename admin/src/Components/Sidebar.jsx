import React from 'react'
import { useContext } from 'react'
import { AdminContext } from '../Context/AdminContext'
import {NavLink} from "react-router-dom"

const Sidebar = () => {
  const {aToken}=useContext(AdminContext)
  return (
    <div className='min-h-screen bg-white border-r'>
      {
        aToken && <ul className='text-[#515151] mt-5'>
          <NavLink className={({isActive})=>`flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary': ''}`} to={"/admin-dashboard"}>
            <img src="" alt=""/>
            <p>Dashboard</p>
          </NavLink>
          <NavLink className={({isActive})=>`flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary': ''}`} to={"/add-doctor"}>
            <img src="" alt=""/>
            <p>Add Doctors</p>
          </NavLink>
          <NavLink className={({isActive})=>`flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary': ''}`} to={"/doctor-list"}>
            <img src="" alt=""/>
            <p>Doctors List</p>
          </NavLink>
        </ul>
      }
    </div>
  )
}

export default Sidebar