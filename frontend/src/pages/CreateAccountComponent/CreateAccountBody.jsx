import { Link } from "react-router-dom";
import styles from "./CreateAccountBody.module.css"

const CreateAccuntBody = () => {
   return (
    <>  <div className={styles.topform}>
          <form className={`${styles.formClass} flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[#5E5E5E] text-sm shadow-lg`}>
            <div className={`${styles.form} `}>
                 <p className={styles.para1}>Create Account</p>
                 <p className={styles.para2}>Please sign up to book appointment</p>
                 <div >
                   <p className={styles.para3}>Full Name</p>
                   <input className={styles.input} type="text" required="" value=""/>
                 </div>
                <div class="w-full ">
                  <p className={styles.para3}>Email</p>
                 <input className={styles.input} type="email" required="" value=""/>
                 </div>
                <div class="w-full">
                  <p className={styles.para3}>Password</p>
                  <input className={styles.input} type="password" required="" value=""/>
                </div>
                <div className={styles.createTop}>
                <button  className={`${styles.create} bg-primary text-white w-full py-2 my-2 rounded-md text-base`}>Create account</        button>
                </div>
                <p className={styles.para2}>Already have an account? <span class="text-primary underline cursor-pointer">
                  <Link to="/loginPage">login</Link>
                  </span></p>
                </div>
            </form>
            </div>
    </>
   )
}

export default CreateAccuntBody;