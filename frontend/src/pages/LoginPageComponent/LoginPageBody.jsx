import { Link } from "react-router-dom";
import styles from "./LoginPageBody.module.css"

const LoginPageBody = () => {
   return(
    <>
       <div className={styles.topform}>
        <form className={`${styles.formClass} flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[#5E5E5E] text-sm shadow-lg`}>
           <div className={styles.form}>
             <div>
              <p className={styles.para1}>Login</p>
              <p className={styles.para2}>Please log in to book appointment</p>
              <div className={styles.para3}><p>Email</p>
              <input className={styles.input} type="email" required="" value=""/>
              </div>
             <div>
                <p className={styles.para3}>Password</p>
                <input className={styles.input} type="password" required="" value=""/>
              </div>
              <div className={styles.loginTop}>
              <button className={`${styles.login} bg-primary text-white w-full py-2 my-2 rounded-md text-base`}>Login</button>
              </div>
             <p className={styles.para2}>Create an new account? 
              <span class="text-primary underline cursor-pointer">
                <Link to="/createAccount" >Click here</Link>
                </span>
             </p>
          </div>
          </div>
        </form>
       </div> 
    </>
   )
}

export default LoginPageBody;