import styles from "./Hero.module.css"

const Hero = () => {
    return (
      <> 

          <div className= "container my-6">
            <div className={styles.heading}>
              <div class="col-lg-7 p-3 p-lg-5 pt-lg-3">
                  <h1 class={`${styles.heading1} `}>Book Appointment
                    With Trusted Doctors</h1>
                   <div className={styles.heading1}>
                       <img class="w-full md:absolute bottom-0 h-auto rounded-lg" src="https://prescripto.vercel.app/assets/group_profiles-BCL6AVF5.png" alt=""/>
                      <p className="lead">Simply browse through our extensive list of trusted <br/> doctors, <br/>
                       schedule your appointment hassle-free.</p>
                   </div>
                  <div class="d-grid gap-2 d-md-flex justify-content-md-start mb-4 mb-lg-3">
                     <button type="button" className={styles.button}>Book appointment -</button>
                  </div>
              </div>
                 <div >
                 <img className={styles.image} src="https://prescripto.vercel.app/assets/header_img-DhAi3lLA.png" alt=""/>
                </div>
             </div>
         </div>
      
      </>
    )
}

export default Hero;