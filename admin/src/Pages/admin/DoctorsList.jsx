import React, { useEffect, useState,useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const localhosts="http://localhost:4000"
import styles from "./DoctorsList.module.css"
import { AdminContext } from '../../Context/AdminContext';

const DoctorsList = () => {
  const [doctorsBySpecialty, setDoctorsBySpecialty] = useState({});
  const navigate=useNavigate();
  const {backendUrl} = useContext(AdminContext)

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/doctor/allDoctors`);
        if (response.data.success) {
          setDoctorsBySpecialty(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };

    fetchDoctors();
  }, []);

  return (
    <div className={styles.specialityContainer}>
    {Object.entries(doctorsBySpecialty).map(([specialty, doctors]) => (
      <div key={specialty} id={specialty.toLowerCase()} className={styles.specialty_section}>
        <h2 className={styles.specialty_title}>{specialty}</h2>
        <div className={styles.doctor_list}>
          {doctors.map(doctor => (
            <div key={doctor._id} className={styles.doctor_card} onClick={() => handleClick(doctor._id)}>
              <img src={doctor.image} alt={doctor.name} className={styles.doctor_image} />
              <div className={styles.action}>
              <p className={styles.availability_status}>Available</p>
              <h3 className={styles.doctor_name}>{doctor.name}</h3>
              <p className={styles.doctor_specialty}>{doctor.speciality}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    ))}
  </div>
  );
};

export default DoctorsList;
