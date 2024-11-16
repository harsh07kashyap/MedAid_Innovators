import { createContext,useState,useEffect } from "react";
// import { decode as jwt_decode } from "jwt-decode";

export const DoctorContext = createContext();       

const DoctorContextProvider = (props) => {
  const[dToken, setDToken] = useState(localStorage.getItem('dToken')? localStorage.getItem('dToken'):'')
  const [role, setRole] = useState('');

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    if (dToken) {
      try {
        const base64Url = dToken.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(
          atob(base64)
            .split('')
            .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
            .join('')
        );
        const parsedPayload = JSON.parse(jsonPayload);
        setRole(parsedPayload.role || '');
      } catch (error) {
        console.error('Error decoding token:', error);
        setRole('');
      }
    } else {
      setRole(''); // Clear role if there's no token
    }
  }, [dToken]); // Re-run this effect whenever dToken changes

  // useEffect(() => {
  //   if (dToken) {
  //     try {
  //       // Split the token to access the payload
  //       const payload = JSON.parse(atob(dToken.split(".")[1]));
  //       setRole(payload.type); // Extract the 'type' as role directly
  //     } catch (error) {
  //       console.error("Failed to parse token:", error);
  //     }
  //   }
  // }, [dToken]);

  const value = {
    dToken,setDToken,backendUrl,role,
    setRole,
  }
  return(
    <DoctorContext.Provider value = {value}>
      {props.children}
    </DoctorContext.Provider>
  )
}

export default DoctorContextProvider