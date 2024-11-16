import { Link } from "react-router-dom";
import styles from "./ProfilePage.module.css"
import React, { useState,useEffect,useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import {UserContext} from "../../Context/ContextProvider"

const ProfilePage = () => {
    const [profile, setProfile] = useState(null);
    const {backendUrl}=useContext(UserContext);

    useEffect(() => {
      const fetchProfile = async () => {
        try {
            const token = localStorage.getItem("token");
            console.log("Auth Token:", token);
            if (token) {
              // Check if token exists before making the request
              const response = await axios.get(`${backendUrl}/api/user/my-profile`, {
                headers: { "auth-token": token },
              });
              console.log(response.data.data)
              setProfile(response.data.data);
            } else {
              console.log("No token found. User may not be logged in.");
            }
          } catch (error) {
            console.error("Error fetching profile data:", error);
          }
      };
  
      fetchProfile();
    }, []);
  
    if (!profile) {
      return <div>Loading...</div>;
    }
  
    return (
      <div className={styles.profile_container}>
        <div className={styles.profile_header}>
          <img
            src={profile.image || 'default-profile.png'}
            alt="Profile"
            className={styles.profile_image}
          />
          <h2><strong>{profile.name}</strong></h2>
        </div>
  
        <div className={styles.profile_section}>
          <h3>Contact Information</h3>
          <p><strong>Email id:</strong> <span>{profile.email}</span></p>
          <p><strong>Phone:</strong> <span> {profile.contact_info || 'Not Provided'}</span></p>
          <p><strong>Address:</strong> <span> {profile.address || 'Not Provided'}</span></p>
        </div>
  
        <div className={styles.profile_section}>
          <h3>Basic Information</h3>
          <p><strong>Gender:</strong> <span>{profile.gender || 'Not Selected'}</span></p>
          <p><strong>Birthday:</strong> <span>{profile.dob || 'Not Selected'}</span></p>
        </div>

        <div className={styles.profile_section}>
          <h3>Medical Information</h3>
          <p><strong>Weight:</strong><span>{profile.weight || 'Not Selected'}</span></p>
          <p><strong>Health problem:</strong> <span> {profile.health_problem || 'Not Selected'}</span></p>
          <p><strong>Prescribed medicine:</strong> <span>{profile.prescribed_medicine || 'Not Selected'}</span> </p>
          <p><strong>Health update:</strong><span>{profile.health_update || 'Not Selected'}</span> </p>
        </div>
  
        
      </div>
    );
}

export default ProfilePage
