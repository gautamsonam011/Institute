import { useState } from 'react';
import './App.css';
import Header from './Header';
import Sidebar from './Sidebar';
import Home from './Home'; 
import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import AddStudent from './students/Addstudent'; 
import Allstudents from './students/Allstudents';
import Feehead from './Fee management/Feehead';
import Classhead from './Fee management/Classhead';
import FeeSubmission from './Fee management/Feesubmission';
import Feereport from './Fee management/Feereport';
import AddCourse from './Course/Addcourse';
import Allcourse from './Course/Allcourse';
import Certificate from './Certificate';
import Login from './login/Login';


function App() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  return (
    <BrowserRouter>
      <div className='grid-container'>
        <Header OpenSidebar={OpenSidebar} />
        <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />
        <div className="content">
          <Routes>
            <Route path='/' element={<Home />} /> 
            <Route path='/students/addstudent' element={<AddStudent />} /> 
            <Route path='/students/allstudents' element={<Allstudents/>} />
            <Route path='/fee management/feehead' element={<Feehead/>} />
            <Route path='/fee management/classhead' element={<Classhead/>} />
            <Route path='/fee management/feesubmission' element={<FeeSubmission/>} />
            <Route path='/fee management/feereport' element={<Feereport/>} />
            <Route path='/course/addccourse' element={<AddCourse/>} />
            <Route path='/course/allcourse' element={<Allcourse/>} />
            <Route path='/certificate' element={<Certificate/>}/>
            <Route path='/login/login' element={<Login/>} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
