import React, { useEffect, useState,useContext } from "react";
import axios from "axios";
import styles from "./LabReportsDialog.module.css";
import { DoctorContext } from '../../Context/DoctorContext';

const LabReportsDialog = ({ patientId, onClose }) => {
  const { dToken, backendUrl } = useContext(DoctorContext);
  const [labReports, setLabReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchLabReports = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${backendUrl}/api/doctor/lab-reports/${patientId}`, {
          headers: { "auth-token": dToken },
        });
        setLabReports(response.data.labReports);
      } catch (err) {
        console.error("Failed to fetch lab reports:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchLabReports();
  }, [patientId]);

  
    return (
      <div className={styles.dialogOverlay}>
        <div className={styles.dialogContent}>
          <button className={styles.closeButton} onClick={onClose}>
            ✕
          </button>
          <h2 className={styles.dialogTitle}>Lab Reports</h2>
  
          {loading ? (
            <p>Loading...</p>
          ) : labReports.length === 0 ? (
            <p>No lab reports found.</p>
          ) : (
            <ul className={styles.reportList}>
              {labReports.map((report) => (
                <li key={report._id} className={styles.reportItem}>
                  <img
                    src={report.image_url}
                    alt={report.test_name}
                    className={styles.reportImage}
                    onClick={() => setSelectedImage(report.image_url)} // Open image in full view
                  />
                  <div className={styles.reportDetails}>
                    <h3>{report.test_name}</h3>
                    <p>
                      Date: {new Date(report.date).toLocaleDateString()}{" "}
                      {new Date(report.date).toLocaleTimeString()}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          )}
  
          {/* Full-Size Image Modal */}
          {selectedImage && (
            <div className={styles.imageModalOverlay}>
              <div className={styles.imageModalContent}>
                <button
                  className={styles.closeButton}
                  onClick={() => setSelectedImage(null)}
                >
                  ✕
                </button>
                <img
                  src={selectedImage}
                  alt="Lab Report"
                  className={styles.fullSizeImage}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    );
};

export default LabReportsDialog;
