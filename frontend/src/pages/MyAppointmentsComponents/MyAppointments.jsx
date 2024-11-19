import React, { useEffect, useState,useContext } from "react";
import axios from "axios";
import styles from "./MyAppointments.module.css";
import {UserContext} from "../../Context/ContextProvider"

const MyAppointments = ({ patientId }) => {
  const [appointments, setAppointments] = useState([]);
  const [patientName, setPatientName] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const {backendUrl}=useContext(UserContext);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${backendUrl}/api/user/appointments`, {
          headers: { "auth-token": token },
        });
        setAppointments(response.data.appointments);
        setPatientName(response.data.patientName);
      } catch (err) {
        setError("Failed to fetch appointments. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [patientId]);

  if (loading) return <div className={styles.loader}>Loading...</div>;

  if (error) return <div className={styles.error}>{error}</div>;

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Appointments for {patientName}</h2>
      {appointments.length === 0 ? (
        <div className={styles.noAppointments}>No appointments found.</div>
      ) : (
        <ul className={styles.appointmentsList}>
          {appointments.map((appointment, index) => (
            <li key={index} className={styles.appointmentItem}>
              <div className={styles.info}>
                <h3 className={styles.doctorName}>{appointment.doctorName}</h3>
                <p className={styles.speciality}>{appointment.speciality}</p>
                <p className={styles.dateTime}>
                  {appointment.date} at {appointment.time}
                </p>
              </div>
              <div className={styles.status}>
                {appointment.status === "Pending" && (
                  <span className={styles.pending}>Pending</span>
                )}
                {appointment.status === "Accepted" && (
                  <span className={styles.accepted}>✔</span>
                )}
                {appointment.status === "Rejected" && (
                  <span className={styles.rejected}>✕</span>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyAppointments;
