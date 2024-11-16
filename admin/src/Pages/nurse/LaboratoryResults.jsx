import React, { useState,useContext } from 'react';
import axios from 'axios';
import styles from './LaboratoryResults.module.css';
import { DoctorContext } from '../../Context/DoctorContext';

const UploadLabResult = () => {
  const { dToken, backendUrl } = useContext(DoctorContext);
  const [formData, setFormData] = useState({
    patient_name: '',
    test_name: '',
    additional_notes: '',
    technician_name: '',
    result:''
  });
  const [patientId, setPatientId] = useState('');
  const [labResultImage, setLabResultImage] = useState(null);
  const [message, setMessage] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setLabResultImage(e.target.files[0]);
    console.log("Selected file:", e.target.files[0]); // Log the selected file
  };

  // Function to search for the patient by name
  const searchPatient = async () => {
    if (!formData.patient_name) {
      setMessage('Please enter a patient name to search.');
      return;
    }

    setLoading(true);
    setSearchResults([]); // Clear previous results
    setMessage(''); // Clear any previous messages

    try {
      const response = await axios.get(
        `${backendUrl}/api/nurse/patients/search?name=${formData.patient_name}`, // Adjust backend route as needed
        {
          headers: { "auth-token":dToken },
        }
      );

      if (response.data.patients && response.data.patients.length > 0) {
        setSearchResults(response.data.patients);
        setMessage(`Found ${response.data.patients.length} matching patient(s).`);
      } else {
        setMessage('No patient found with that name.');
      }
      setLoading(false);
    } catch (error) {
      console.error(error);
      setMessage('Error searching for patients. Please try again.');
      setLoading(false);
    }
  };

  const selectPatient = (patient) => {
    setFormData({ ...formData, patient_name: patient.name });
    setPatientId(patient._id); // Save the selected patient ID
    setSearchResults([]);
    setMessage('Patient selected successfully.');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!patientId || !formData.test_name || !labResultImage) {
      setMessage('All fields are required, and a patient must be selected.');
      return;
    }

    const uploadData = new FormData();
    uploadData.append('patient_id', patientId);
    uploadData.append('test_name', formData.test_name);
    uploadData.append('additional_notes', formData.additional_notes);
    uploadData.append('lab_result_image', labResultImage);
    uploadData.append('result', formData.result);
    uploadData.append('technician_name', formData.technician_name);

    try {
      const response = await axios.post(`${backendUrl}/api/nurse/lab-results`, uploadData, {
        headers: {
          "auth-token":dToken,
          'Content-Type': 'multipart/form-data',
        },
      });

      setMessage('Lab result uploaded successfully!');
      setFormData({ patient_name: '', test_name: '', additional_notes: '',result:'',technician_name:'' });
      setLabResultImage(null);
      setPatientId('');
    } catch (error) {
      console.error(error);
      setMessage('Error uploading lab result. Please try again.');
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Upload Lab Result</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="patient_name" className={styles.label}>
            Patient Name:
          </label>
          <input
            type="text"
            id="patient_name"
            name="patient_name"
            value={formData.patient_name}
            onChange={handleChange}
            className={styles.input}
            required
          />
          {loading && <p className={styles.loading}>Searching...</p>}
          {searchResults.length > 0 && (
            <div className={styles.searchResults}>
              {searchResults.map((patient) => (
                <div
                  key={patient._id}
                  onClick={() => selectPatient(patient)}
                  className={styles.searchResultItem}
                >
                  {patient.name} (ID: {patient._id})
                </div>
              ))}
            </div>
          )}
          <button
            type="button"
            onClick={searchPatient}
            className={styles.searchButton}
          >
            Search
          </button>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="test_name" className={styles.label}>
            Test Name:
          </label>
          <input
            type="text"
            id="test_name"
            name="test_name"
            value={formData.test_name}
            onChange={handleChange}
            className={styles.input}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="additional_notes" className={styles.label}>
            Additional Notes (optional):
          </label>
          <textarea
            id="additional_notes"
            name="additional_notes"
            value={formData.additional_notes}
            onChange={handleChange}
            className={styles.textarea}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="lab_result_image" className={styles.label}>
            Lab Result Image:
          </label>
          <input
            type="file"
            id="lab_result_image"
            onChange={handleFileChange}
            className={styles.fileInput}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="result" className={styles.label}>
            Technician Name:
          </label>
          <input
            type="text"
            id="result"
            name="result"
            value={formData.result || ''}
            onChange={handleChange}
            className={styles.input}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="technician_name" className={styles.label}>
            Technician Name:
          </label>
          <input
            type="text"
            id="technician_name"
            name="technician_name"
            value={formData.technician_name || ''}
            onChange={handleChange}
            className={styles.input}
            required
          />
        </div>
        <button type="submit" className={styles.button}>
          Upload
        </button>
      </form>
      {message && <p className={styles.message}>{message}</p>}
    </div>
  );
};

export default UploadLabResult;
