import React, { useContext,useState,useEffect } from 'react'
import Login from './Pages/Login'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AdminContext } from './Context/AdminContext';
import Navbar from './Components/Navbar';
import Sidebar from './Components/Sidebar';
import {Routes,Route,Navigate} from "react-router-dom"
import Dashboard from "./Pages/admin/Dashboard"
import AddDoctor from "./Pages/admin/AddDoctor"
import DoctorsList from "./Pages/admin/DoctorsList"
import { DoctorContext } from './Context/DoctorContext';
import ManageAppointments from "./Pages/doctor/ManageAppointments"
import AddNurse from "./Pages/admin/AddNurse"
import ManagePatient from "./Pages/nurse/ManagePatient"
import Home from "./Pages/Home"
import PatientProfile from './Pages/doctor/PatientProfile';
import PatientList from './Pages/nurse/PatientList';
import LaboratoryResults from "./Pages/nurse/LaboratoryResults"

const App = () => {
  const { aToken } = useContext(AdminContext);
  const { dToken, role } = useContext(DoctorContext);
  
  // Define allowed paths for each role
  const roleRoutes = {
    Doctor: ["/", "/manage-appointments", "/doctor-list","/patientData/:patientId"],
    Nurse: ["/", "/updatePatientData/:patientId","/allPatients", "/doctor-list","/uploadLabResults"], 
    Admin: ["/", "/dashboard", "/add-doctor", "/add-nurse", "/doctor-list"],
  };

  const [allowedRoutes, setAllowedRoutes] = useState([]);

  useEffect(() => {
    if (aToken) {
      setAllowedRoutes(roleRoutes.Admin);
    } else if (dToken && role) {
      setAllowedRoutes(roleRoutes[role] || []);
    }
  }, [aToken, dToken, role]); // Update allowedRoutes when tokens or role changes

  return aToken || dToken ? (
    <div className='bg-[#F8F9FD]'>
      <ToastContainer />
      <Navbar />
      <div className='flex items-start'>
        <Sidebar />
        <Routes>
          {allowedRoutes.includes("/") && <Route path="/" element={<Home />} />}
          {allowedRoutes.includes("/dashboard") && <Route path="/dashboard" element={<Dashboard />} />}
          {allowedRoutes.includes("/add-doctor") && <Route path="/add-doctor" element={<AddDoctor />} />}
          {allowedRoutes.includes("/add-nurse") && <Route path="/add-nurse" element={<AddNurse />} />}
          {allowedRoutes.includes("/doctor-list") && <Route path="/doctor-list" element={<DoctorsList />} />}
          {allowedRoutes.includes("/manage-appointments") && <Route path="/manage-appointments" element={<ManageAppointments />} />}
          {allowedRoutes.includes("/updatePatientData/:patientId") && <Route path="/updatePatientData/:patientId" element={<ManagePatient />} />}
          {allowedRoutes.includes("/allPatients") && <Route path="/allPatients" element={<PatientList />} />}
          {allowedRoutes.includes("/patientData/:patientId") && <Route path="/patientData/:patientId" element={<PatientProfile />} />}
          {allowedRoutes.includes("/uploadLabResults") && <Route path="/uploadLabResults" element={<LaboratoryResults />} />}

          {/* Fallback route if no path matches */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </div>
  ) : (
    <div>
      <Login />
      <ToastContainer />
    </div>
  );
};

export default App