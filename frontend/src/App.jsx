import "bootstrap/dist/css/bootstrap.min.css";
import './App.css'
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import All_Doctor from "./pages/All_Doctor";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {

  return (
    <>
        {/* <Home></Home> */}
        {/* <About></About> */}
        {/* <Contact></Contact> */}
        {/* <AllDoctor></AllDoctor> */}
        <Router>
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/allDoctor" exact element={<All_Doctor/>} />
            <Route path="/about" exact element={<About/>} />
            <Route path="/contact" exact element={<Contact/>} />
            
          </Routes>
        </Router>
    </>
  )
}

export default App
