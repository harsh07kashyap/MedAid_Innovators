import React from 'react'
import styles from "./Dashboard.module.css"

const Dashboard = () => {
  return (
    <div className={styles.mainContent}>
      <div className={styles.dashboardHeader}>
        <h1 className={styles.dashboardTitle}>Dashboard Panel</h1>
      </div>
      
      <div className={styles.stats}>
        <div className={styles.statBox}>
          <div className={styles.statNumber}>15</div>
          <div className={styles.statLabel}>Doctors</div>
        </div>
        <div className={styles.statBox}>
          <div className={styles.statNumber}>3184</div>
          <div className={styles.statLabel}>Appointments</div>
        </div>
        <div className={styles.statBox}>
          <div className={styles.statNumber}>2545</div>
          <div className={styles.statLabel}>Patients</div>
        </div>
      </div>

      <div className={styles.latestBookings}>
        <h2 className={styles.sectionTitle}>Latest Bookings</h2>
        <ul className={styles.bookingList}>
          <li className={styles.bookingItem}>
            <img src="doctor-image.png" alt="Doctor" className={styles.doctorImage} />
            <div className={styles.bookingInfo}>
              <div className={styles.doctorName}>Dr. Emily Larson</div>
              <div className={styles.bookingDate}>Booking on 11 Dec 2024</div>
            </div>
            <button className={styles.cancelButton}>✕</button>
          </li>
          <li className={styles.bookingItem}>
            <img src="doctor-image.png" alt="Doctor" className={styles.doctorImage} />
            <div className={styles.bookingInfo}>
              <div className={styles.doctorName}>Dr. Richard James</div>
              <div className={styles.bookingDate}>Booking on 10 Dec 2024</div>
            </div>
            <button className={`${styles.cancelButton} ${styles.cancelled}`}>Cancelled</button>
          </li>
          {/* Add more booking items as needed */}
        </ul>
      </div>
    </div>
  )
}

export default Dashboard
