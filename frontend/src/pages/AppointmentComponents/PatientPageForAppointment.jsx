import React,{useState,useEffect} from 'react'
import styles from "./PatientPageForAppointment.module.css"
const localhosts="http://localhost:4000"
import { useParams } from 'react-router-dom'
import axios from "axios"

const PatientPageForAppointment = () => {
    const {doctorId} =useParams()
    const [doctorData,setDoctorData]=useState(null)
    const [selectedDate, setSelectedDate] = useState('SUN 10');
    const [selectedTime, setSelectedTime] = useState('');

    const dates = ['SUN 10', 'MON 11', 'TUE 12', 'WED 13', 'THU 14', 'FRI 15', 'SAT 16'];
    const times = ['01:00 pm', '01:30 pm', '02:00 pm', '02:30 pm', '03:00 pm', '03:30 pm', '04:00 pm'];

    const handleDateClick = (date) => {
        setSelectedDate(date);
    };

    const handleTimeClick = (time) => {
        setSelectedTime(time);
    };

    const handleAppointmentBooking = () => {
        alert(`Appointment booked for ${selectedDate} at ${selectedTime}`);
    };

    useEffect(() => {
        const fetchDoctorData = async () => {
          try {
            const response = await axios.get(`${localhosts}/api/user/doctorData/${doctorId}`);
              setDoctorData(response.data);
            
          } catch (error) {
            console.error("Error fetching doctors:", error);
          }
        };
    
        fetchDoctorData();
      }, [doctorId]);

    return (
        <div className={styles.doctor_profile}>
      <div className={styles.profile_header}>
        {/* Conditional rendering to check if doctorData is available */}
        {doctorData ? (
          <>
            <img
              src={doctorData.image}
              alt="Doctor"
              className={styles.doctor_image}
            />
            <div className={styles.doctor_info}>
              <h2>
                {doctorData.name} <span className={styles.verified_badge}>✔️</span>
              </h2>
              <p className={styles.degree}>
                {doctorData.degree} - {doctorData.speciality}{' '}
                <span className={styles.experience}>{doctorData.experience || '4 Years'}</span>
              </p>
              <p className={styles.about}>
                <strong>About:</strong> {doctorData.about}
              </p>
              <p className={styles.contact_info}><strong>Contact:</strong> {doctorData.contact_info}</p>
              <p className={styles.address}><strong>Address:</strong> {doctorData.address}</p>
              <p className={styles.appointment_fee}>
                <strong>Appointment fee:</strong> Rs {doctorData.fees}
              </p>
              <p className={styles.license}><strong>License Number:</strong> {doctorData.license_number}</p>
            </div>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
      <div className={styles.booking_section}>
        <h3>Booking slots</h3>
        <div className={styles.date_selector}>
          {dates.map((date) => (
            <button
              key={date}
              className={`date-button ${selectedDate === date ? 'selected' : ''}`}
              onClick={() => handleDateClick(date)}
            >
              {date}
            </button>
          ))}
        </div>
        <div className={styles.time_selector}>
          {times.map((time) => (
            <button
              key={time}
              className={`time-button ${selectedTime === time ? 'selected' : ''}`}
              onClick={() => handleTimeClick(time)}
            >
              {time}
            </button>
          ))}
        </div>
        <button className={styles.book_appointment} onClick={handleAppointmentBooking}>
          Book an appointment
        </button>
      </div>
    </div>
  );
}

export default PatientPageForAppointment
