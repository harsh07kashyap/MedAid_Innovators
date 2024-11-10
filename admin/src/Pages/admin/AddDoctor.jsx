import React, { useState } from 'react';
import styles from './AddDoctor.module.css';

const AddDoctor = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    speciality: 'General physician',
    degree: '',
    about: '',
    contact_info: '',
    address1: '',
    address2: '',
    available_slots: '',
    fees: '',
    role: 'Doctor',
    license_number: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit the form data here
  };

  return (
    <div className={styles.mainContent}>
      <h2 className={styles.formTitle}>Add Doctor</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label className={styles.uploadLabel}>Upload doctor picture</label>
          <input type="file" name="image" className={styles.fileInput} />
        </div>

        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label>Your name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Name"
              className={styles.inputField}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label>Speciality</label>
            <select
              name="speciality"
              value={formData.speciality}
              onChange={handleChange}
              className={styles.selectField}
              required
            >
              <option value="General physician">General physician</option>
              <option value="Cardiologist">Cardiologist</option>
              <option value="Neurologist">Neurologist</option>
              <option value="Pediatrician">Pediatrician</option>
              {/* Add more specialties as needed */}
            </select>
          </div>
        </div>

        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label>Doctor Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className={styles.inputField}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label>Degree</label>
            <input
              type="text"
              name="degree"
              value={formData.degree}
              onChange={handleChange}
              placeholder="Degree"
              className={styles.inputField}
              required
            />
          </div>
        </div>

        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label>Set Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className={styles.inputField}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label>Address</label>
            <input
              type="text"
              name="address1"
              value={formData.address1}
              onChange={handleChange}
              placeholder="Address 1"
              className={styles.inputField}
              required
            />
            <input
              type="text"
              name="address2"
              value={formData.address2}
              onChange={handleChange}
              placeholder="Address 2"
              className={styles.inputField}
            />
          </div>
        </div>

        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label>Experience</label>
            <input
              type="text"
              name="available_slots"
              value={formData.available_slots}
              onChange={handleChange}
              placeholder="Available slots"
              className={styles.inputField}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label>Fees</label>
            <input
              type="number"
              name="fees"
              value={formData.fees}
              onChange={handleChange}
              placeholder="Doctor fees"
              className={styles.inputField}
              required
            />
          </div>
        </div>

        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label>License Number</label>
            <input
              type="text"
              name="license_number"
              value={formData.license_number}
              onChange={handleChange}
              placeholder="License Number"
              className={styles.inputField}
              required
            />
          </div>
        </div>

        <button type="submit" className={styles.submitButton}>Add Doctor</button>
      </form>
    </div>
  );
};

export default AddDoctor;
