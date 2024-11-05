import { Link } from "react-router-dom";
import styles from "./CreateAccountBody.module.css"

const CreateAccuntBody = () => {
   return (
    <>  <div className={styles.topform}>
          <form className={styles.formClass}>
            <div className={`${styles.form} `}>
                 <p>Create Account</p>
                 <p>Please sign up to book appointment</p>
                 <div >
                   <p>Full Name</p>
                   <input type="text" required="" value=""/>
                 </div>
                <div class="w-full ">
                  <p>Email</p>
                 <input  type="email" required="" value=""/>
                 </div>
                <div class="w-full">
                  <p>Password</p>
                  <input  type="password" required="" value=""/>
                </div>
                <button class="bg-primary text-white w-full py-2 my-2 rounded-md text-base">Create account</        button>
                <p>Already have an account? <span class="text-primary underline cursor-pointer">
                  <Link to="/loginPage">login</Link>
                  </span></p>
                </div>
            </form>
            </div>
    </>
   )
}

export default CreateAccuntBody;