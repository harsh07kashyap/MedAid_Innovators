import { Link } from "react-router-dom";
import styles from "./LoginPageBody.module.css"

const LoginPageBody = () => {
   return(
    <>
       <div className={styles.upper}>
        <form className={styles.upper3}>
             <div class="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[#5E5E5E] text-sm shadow-lg">
              <p class="text-2xl font-semibold">Login</p>
              <p>Please log in to book appointment</p>
              <div class="w-full "><p>Email</p>
              <input class="border border-[#DADADA] rounded w-full p-2 mt-1" type="email" required="" value=""/>
            </div>
           <div class="w-full ">
              <p>Password</p>
              <input class="border border-[#DADADA] rounded w-full p-2 mt-1" type="password" required="" value=""/>
              </div>
            <button class="bg-primary text-white w-full py-2 my-2 rounded-md text-base">Login</button>
            <p>Create an new account? 
              <span class="text-primary underline cursor-pointer">
                <Link to="/createAccount" >Click here</Link>
                </span>
            </p>
          </div>
         
        </form>
       </div> 
    </>
   )
}

export default LoginPageBody;