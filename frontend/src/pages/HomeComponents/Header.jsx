import styles from "./Header.module.css"
import { GiHospital } from "react-icons/gi";
import About from "../About";
import {Link} from "react-router-dom"

const Header = () => {

    return (
      <>
          <div className={`${styles.header} container`}>
            <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4  border-bottom">
                 <nav className="navbar bg-body-tertiary">
                      <div className="container-fluid">
                        <a className={`${styles.myClass} navbar-brand`} href="#" >
                          {/* <img src="" alt="Logo" width="30" height="24" class="d-inline-block align-text-top"/> */}
                          {/* <GiHospital /> */}
                          <i class="bi bi-flower1"></i>
                          MedAid Innovators
                          </a>
                      </div>
                  </nav>

              <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
                <li><Link to="/" className={`${styles.myClass1} nav-link px-2`}>HOME</Link></li>
                <li><Link to="/allDoctor" className={`${styles.myClass1} nav-link px-2`}>ALL DOCTORS</Link></li>
                <li><Link to="/about" className={`${styles.myClass1} nav-link px-2`}>ABOUT</Link></li>
                <li><Link to="/contact" className={`${styles.myClass1} nav-link px-2`}>CONTACT</Link></li>
                <li><Link to="/" className={`${styles.myClass3} nav-link px-2`}  title="Admin/Doctor/Nurse Login" role="button" >Admin Panel</Link></li>
              </ul>

             <div >
                {/* <button type="button" className={styles.myClass2}>Create account</button> */}
                <Link className={`${styles.myClass2} nav-link px-2`} to="/createAccount" title="Patient account creation" role="button">Create account</Link>
             </div>

           </header>
         </div>
      </>
    );
};

export default Header;