import { Link ,useNavigate} from "react-router-dom";
import React, { useContext, useEffect, useState } from 'react';
import styles from "./Body.module.css"
import {UserContext} from "../../Context/ContextProvider"
import axios from 'axios';

const Body = () => {
    
  const [doctorsBySpecialty, setDoctorsBySpecialty] = useState({});
  const navigate=useNavigate();
  const {backendUrl}=useContext(UserContext);

  const handleClick=(doctorId)=>{
    navigate(`/appointmentBooking/${doctorId}`)
  }

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
    <>

          <div className={styles.upper}>
              <p className={styles.upper1}>Find by Speciality</p>
              <p className={styles.upper2}>Simply browse through our extensive list of trusted <br/> doctors, schedule your appointment hassle-free.</p>
          </div>

          <div className={styles.container}>
              <div className={styles.cont}>
                   <div className={styles.button5}>
                    <span>
                    <a href="#general physician"> <img className={styles.image234} src="https://png.pngtree.com/png-vector/20191130/ourmid/pngtree-doctor-icon-circle-png-image_2055257.jpg"></img></a> </span>
                   </div>
                   <p ><a href="#general physician" className={styles.para}>General physician</a></p>
              </div>
              <div  className={styles.cont}>
                   <div className={styles.button5}>
                    <span>
                   <a href="#gynecologist"><img  className={styles.image234} src="https://www.shutterstock.com/image-vector/baby-sleeping-hand-logo-care-260nw-1952053138.jpg"></img></a></span>
                   </div>
                   <p><a href="#gynecologist" className={styles.para}>Gynecologist</a></p>
              </div>
              <div  className={styles.cont}>
                    <div className={styles.button5}>
                    <span>
                    <a href="#dermatologist"><img className={styles.image234} src="https://img.freepik.com/premium-vector/dermatologist-logo_848918-16887.jpg?semt=ais_hybrid"></img></a></span>
                    </div>
                   <p><a href="#dermatologist" className={styles.para}>Dermatologist</a></p>
              </div>
              <div  className={styles.cont}>
                  <div className={styles.button5}>
                  <span>
                  <a href="#pediatrician">
                  <img className={styles.image234} src="https://www.shutterstock.com/image-vector/vector-black-line-icon-pediatric-260nw-2459128661.jpg"></img></a></span>
                  </div>
                  <p><a href="#pediatrician" className={styles.para}>Pediatrician</a></p>
              </div>
              <div  className={styles.cont}>
                  <div className={styles.button5}>
                    <span>
                  <a href="#neurologist"><img className={styles.image234} src="https://cdn-icons-png.freepik.com/512/9445/9445780.png"></img></a> </span>
                  </div>
                  <p><a href="#neurologist" className={styles.para}>Neurologist</a></p>
              </div>
              <div  className={styles.cont}>
                  <div className={styles.button5}>
                    <span>
                  <a href="#cardiologist"><img className={styles.image234} src="https://img.freepik.com/free-vector/cardiologist-concept-illustration_114360-6987.jpg?uid=R147565378&ga=GA1.1.2084410199.1703698421&semt=ais_hybrid"></img></a> </span>
                  </div>
                  <p><a href="#cardiologist" className={styles.para}>Cardiologist</a></p>
              </div>
              <div  className={styles.cont}>
                  <div className={styles.button5}>
                    <span>
                  <a href="#gastroenterologist"><img className={styles.image234} src="https://cdn-icons-png.flaticon.com/512/7965/7965286.png"></img></a></span>
                  </div>
                 <p><a href="#gastroenterologist" className={styles.para}>Gastroenterologist</a></p>
              </div>
          </div>

        <div className={styles.Doctor}>
              <p className={styles.Doctor1}>Top Doctors to Book</p>
              <p className={styles.Doctor2}>Simply browse through our extensive list of trusted <br/> doctors.</p>
        </div>


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

         <div className= "container my-5">
         <div className={`${styles.lower_container} `}>
              <div className="col-lg-7 p-3 p-lg-5 pt-lg-3">
                <h1 className={styles.lower_container1}>Book Appointment <br/> With 100+ Trusted <br/> Doctors</h1>
                <div className="d-grid gap-2 d-md-flex justify-content-md-start mb-4 mb-lg-3">
                 <Link to="./createAccount"> <button type="button" className={styles.lower_container2}>Create account
                  </button></Link>
                </div>
              </div>
              <div className={`${styles.lower_container3} `}>
                  <img className={styles.image} src="https://prescripto.vercel.app/assets/appointment_img-DzbZlMsi.png" alt="" />
              </div>
         </div>
         </div>
    </>
  )
}

export default Body;