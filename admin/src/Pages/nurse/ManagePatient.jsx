import React, { useState, useEffect,useContext } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import styles from './ManagePatient.module.css';
import { DoctorContext } from '../../Context/DoctorContext';

const PatientEditForm = () => {
  const { patientId } = useParams();
  const { dToken, backendUrl } = useContext(DoctorContext);
  const [patient, setPatient] = useState({
    dob: '',
    gender: '',
    weight: '',
    health_problem: '',
    prescribed_medicine: '',
    health_update: '',
  });

  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/doctor/patientdata/${patientId}`, {
          headers: { 'auth-token': dToken },
        });
        if (response.data.success) {
          setPatient(response.data.data); // Use 'data' to access patient info
        }
      } catch (error) {
        console.error('Error fetching patient data:', error);
      }
    };

    fetchPatientData();
  }, [backendUrl, patientId, dToken]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPatient((prevPatient) => ({
      ...prevPatient,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(
        `${backendUrl}/api/nurse/updatePatientData/${patientId}`,
        { ...patient },
        { headers: { 'auth-token': dToken } }
      );
      alert('Patient data updated successfully!');
    } catch (error) {
      console.error('Error updating patient data:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.formContainer}>
      <h2 className={styles.heading}>Edit Patient Information</h2>

      <label className={styles.label}>Date of Birth:</label>
      <input
        type="date"
        name="dob"
        value={patient.dob !== "Not filled" ? patient.dob : ""}
        onChange={handleChange}
        className={styles.input}
      />

      <label className={styles.label}>Gender:</label>
      <select
        name="gender"
        value={patient.gender}
        onChange={handleChange}
        className={styles.input}
      >
        <option value="">Select</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
      </select>

      <label className={styles.label}>Weight:</label>
      <input
        type="text"
        name="weight"
        value={patient.weight}
        onChange={handleChange}
        className={styles.input}
      />

      <label className={styles.label}>Health Problem:</label>
      <textarea
        name="health_problem"
        value={patient.health_problem}
        onChange={handleChange}
        className={styles.textarea}
      />

      <label className={styles.label}>Prescribed Medicine:</label>
      <textarea
        name="prescribed_medicine"
        value={patient.prescribed_medicine}
        onChange={handleChange}
        className={styles.textarea}
      />

      <label className={styles.label}>Health Update:</label>
      <textarea
        name="health_update"
        value={patient.health_update}
        onChange={handleChange}
        className={styles.textarea}
      />

      <button type="submit" className={styles.submitButton}>Save Changes</button>
    </form>
  );
};

export default PatientEditForm;
