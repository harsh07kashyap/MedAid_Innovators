import React, { useContext, useState } from 'react';
import styles from './AddDoctor.module.css';
import { AdminContext } from "../../Context/AdminContext";
import axios from "axios"

const AddDoctor = () => {
  const [formData, setFormData] = useState({
    image:"",
    name: '',
    email: '',
    password: '',
    degree: '',
    about: '',
    contact_info: '',
    address: '',
    role: 'Nurse',
    license_number: ''
  });
  const {backendUrl,aToken}=useContext(AdminContext)

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({ ...formData, [name]: files ? files[0] : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("image", formData.image);
    formDataToSend.append("name", formData.name);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("password", formData.password);
    formDataToSend.append("degree", formData.degree);
    formDataToSend.append("about", formData.about);
    formDataToSend.append("contact_info", formData.contact_info);
    formDataToSend.append("address", formData.address);
    formDataToSend.append("role", formData.role);
    formDataToSend.append("license_number", formData.license_number);

    try {
      const response = await axios.post(`${backendUrl}/api/admin/add-doctor`, formDataToSend, {
        headers: {
          'auth-token': aToken,
          'Content-Type': 'multipart/form-data',
        }
      });

      console.log('Doctor added successfully:', response.data);

    } catch (error) {
      console.error('Error adding doctor:', error);
    }
  };


  return (
    <div className={styles.mainContent}>
      <h2 className={styles.formTitle}>Add Nurse</h2>
      <form className={styles.form} onSubmit={handleSubmit} encType="multipart/form-data">
        <div className={styles.formGroup}>
          <label className={styles.uploadLabel}>Upload doctor picture</label>
          <input type="file" name="image" id="image" className={styles.fileInput} onChange={handleChange}/>
        </div>

        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label>Your name</label>
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Name"
              className={styles.inputField}
              required
            />
          </div>

        </div>

        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label>Nurse Email</label>
            <input
              type="email"
              name="email"
              id="email"
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
              id="degree"
              value={formData.degree}
              onChange={handleChange}
              placeholder="Eg. GNM or ANM"
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
              id="password"
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
              name="address"
              id="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Address"
              className={styles.inputField}
              required
            />
            
          </div>
        </div>

        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label>Contact No.</label>
            <input
              type="text"
              name="contact_info"
              id="contact_info"
              value={formData.contact_info}
              onChange={handleChange}
              placeholder="Nurse's contact no."
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
              id="license_number"
              value={formData.license_number}
              onChange={handleChange}
              placeholder="License Number"
              className={styles.inputField}
              required
            />
          </div>
        </div>

        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label>About</label>
            <input
              type="text"
              name="about"
              value={formData.about}
              onChange={handleChange}
              placeholder="About the nurse"
              className={styles.inputField}
              required
            />
          </div>
        </div>

        <button type="submit" onSubmit={handleSubmit} className={styles.submitButton}>Add Doctor</button>
      </form>
    </div>
  );
};

export default AddDoctor;
