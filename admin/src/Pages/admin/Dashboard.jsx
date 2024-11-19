import React,{useEffect,useState,useContext} from 'react'
import styles from "./Dashboard.module.css"
import { AdminContext } from "../../Context/AdminContext";
import axios from "axios"

const Dashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const {backendUrl,aToken}=useContext(AdminContext)

  const [dashboardData, setDashboardData] = useState({
    doctorsCount: 0,
    appointmentsCount: 0,
    patientsCount: 0,
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/admin/dashboard-data`, {
          headers: { "auth-token": aToken },
        });
        setDashboardData(response.data);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };

    const fetchAppointments = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/admin/getAllAppointments`, {
          headers: { "auth-token": aToken },
        });
        console.log(response.data)
        setAppointments(response.data.appointments); // Assuming backend sends an array of appointments
        setLoading(false);
      } catch (error) {
        console.error('Error fetching appointments:', error);
        setLoading(false);
      }
    };

    
    fetchDashboardData();
    fetchAppointments();
    
  }, []);

  return (
    <center className={styles.upper}>
    <div className={styles.mainContent}>
      <div className={styles.dashboardHeader}>
        <h1 className={styles.dashboardTitle}>Dashboard Panel</h1>
      </div>
      
      <div className={styles.stats}>
        <div className={styles.statBox}>
          <div className={styles.statNumber}>{dashboardData.doctorsCount}</div>
          <div className={styles.statLabel}>Doctors</div>
        </div>
        <div className={styles.statBox}>
          <div className={styles.statNumber}>{dashboardData.appointmentsCount}</div>
          <div className={styles.statLabel}>Appointments</div>
        </div>
        <div className={styles.statBox}>
          <div className={styles.statNumber}>{dashboardData.patientsCount}</div>
          <div className={styles.statLabel}>Patients</div>
        </div>
      </div>

      <div className={styles.latestBookings}>
      <h2 className={styles.sectionTitle}>Latest Bookings</h2>
      {appointments.length === 0 ? (
        <p className={styles.noData}>No bookings available.</p>
      ) : (
        <ul className={styles.bookingList}>
          {appointments.map((appointment) => (
            <li key={appointment._id} className={styles.bookingItem}>
              
              <div className={styles.bookingInfo}>
                <div className={styles.doctorName}>
                  {appointment.doctorName} - Patient: {appointment.patientName}
                </div>
                <div className={styles.bookingDate}>
                  Booking on {appointment.day}, {appointment.time}
                </div>
              </div>
              <div className={styles.statusIndicator}>
                {appointment.status === 'Accepted' && (
                  <span className={`${styles.statusIcon} ${styles.accepted}`}>✔</span>
                )}
                {appointment.status === 'Rejected' && (
                  <span className={`${styles.statusIcon} ${styles.rejected}`}>✕</span>
                )}
                {appointment.status === 'Pending' && (
                  <span className={styles.pendingStatus}>Pending</span>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
    </div>
    </center>
  )
}

export default Dashboard
