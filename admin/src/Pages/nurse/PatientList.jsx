import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { DoctorContext } from '../../Context/DoctorContext';
import { toast } from 'react-toastify';
import styles from './PatientList.module.css';

const PatientList = () => {
  const { dToken, backendUrl } = useContext(DoctorContext);
  const [patients, setPatients] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/nurse/allPatients`, {
          headers: { 'auth-token': dToken },
        });
        setPatients(response.data.patients);
      } catch (error) {
        console.error('Error fetching patients:', error);
        toast.error('Failed to fetch patient list.');
      }
    };

    fetchPatients();
  }, [backendUrl, dToken]);

  const handleEditClick = (patientId) => {
    navigate(`/updatePatientdata/${patientId}`);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Patient List</h2>
      <div className={styles.grid}>
        {patients.map((patient) => (
          <div key={patient._id} className={styles.card}>
            <img
              src={patient.image || 'https://via.placeholder.com/80'}
              alt={patient.name}
              className={styles.image}
            />
            <div className={styles.info}>
              <h3 className={styles.name}>{patient.name}</h3>
              <button
                onClick={() => handleEditClick(patient._id)}
                className={styles.editButton}
              >
                Click to edit patient-data
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PatientList;
