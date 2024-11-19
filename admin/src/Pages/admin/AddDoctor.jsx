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
    speciality: '',
    degree: '',
    about: '',
    contact_info: '',
    address: '',
    fees: '',
    role: 'Doctor',
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
    formDataToSend.append("speciality", formData.speciality);
    formDataToSend.append("degree", formData.degree);
    formDataToSend.append("about", formData.about);
    formDataToSend.append("contact_info", formData.contact_info);
    formDataToSend.append("address", formData.address);
    formDataToSend.append("fees", formData.fees);
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
    <>
     <div className={styles.mainContainer}>
      <h2 className={styles.formTitle}>Add Doctor</h2>
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

          <div className={styles.formGroup}>
            <label>Speciality</label>
            <select
              name="speciality"
              id="speciality"
              value={formData.speciality}
              onChange={handleChange}
              className={styles.selectField}
              required
            >
              <option value="General physician">General physician</option>
              <option value="Cardiologist">Cardiologist</option>
              <option value="Dermatologist">Dermatologist</option>
              <option value="Pediatrician">Pediatrician</option>
              <option value="Neurologist">Neurologist</option>
              <option value="Gynecologist">Gynecologist</option>
              <option value="Gastroenterologist">Gastroenterologist</option>
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
              placeholder="Eg. MBBS"
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
            <label>Fees</label>
            <input
              type="number"
              name="fees"
              id="fees"
              value={formData.fees}
              onChange={handleChange}
              placeholder="Doctor fees"
              className={styles.inputField}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label>Contact No.</label>
            <input
              type="text"
              name="contact_info"
              id="contact_info"
              value={formData.contact_info}
              onChange={handleChange}
              placeholder="Doctor's contact no."
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
              placeholder="About the doctor"
              className={styles.inputField}
              required
            />
          </div>
        </div>

        <button type="submit" onSubmit={handleSubmit} className={styles.submitButton}>Add Doctor</button>
      </form>
    </div>
   
    </>
  );
};

export default AddDoctor;
