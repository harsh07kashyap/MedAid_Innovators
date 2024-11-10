import Footer from "./HomeComponents/Footer";
import Header from "./HomeComponents/Header";
import PatientPageForAppointment from "./AppointmentComponents/PatientPageForAppointment"

const PatientAppointmentPage = () => {
    return (
      <>
         <Header></Header>
         <PatientPageForAppointment></PatientPageForAppointment>
         <Footer></Footer>
      </>
    )
}

export default PatientAppointmentPage;