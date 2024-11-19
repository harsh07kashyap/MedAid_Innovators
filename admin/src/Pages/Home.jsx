import React from 'react'
import styles from "./Home.module.css"

const Home = () => {
  return (
    
       <div className= {`${styles.upper} `}>
         <div className={`${styles.lower_container} `}>
              <div className="col-lg-7 p-3 p-lg-5 pt-lg-3">
                <h1 className={styles.lower_container1}>Navigate Differnt Section <br/> Through Sidebar</h1>
              </div>
              <div className={`${styles.lower_container3} `}>
                  <img className={styles.image} src="https://prescripto.vercel.app/assets/appointment_img-DzbZlMsi.png" alt="" />
              </div>
          </div>
         </div>
   
  )
}

export default Home
