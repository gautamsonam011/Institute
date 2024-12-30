import { useEffect, useState } from 'react';
import './App.css';
import Header from './Header';
import Sidebar from './Sidebar';
import Home from './Home';
import {
  BrowserRouter,
  Route,
  Routes,
  Navigate,
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
import Login from './components/Login';
import Last from './components/Last';

function App() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); 

  useEffect(() => {
    const loggedInStatus = localStorage.getItem('isLoggedIn');
    if (loggedInStatus === 'true') {
      setIsLoggedIn(true); 
    }
  }, [] );

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  return (
    <BrowserRouter>
      {!isLoggedIn ? ( 
        <Routes>
          <Route path="/" element={<Last />} />
          <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      ) : (
        <div className="grid-container">
          <Header OpenSidebar={OpenSidebar} handleLogout={handleLogout} />
          <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />
          <div className="content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/students/addstudent" element={<AddStudent />} />
              <Route path="/students/allstudents" element={<Allstudents />} />
              <Route path="/fee management/feehead" element={<Feehead />} />
              <Route path="/fee management/classhead" element={<Classhead />} />
              <Route path="/fee management/feesubmission" element={<FeeSubmission />} />
              <Route path="/fee management/feereport" element={<Feereport />} />
              <Route path="/course/addcourse" element={<AddCourse />} />
              <Route path="/course/allcourse" element={<Allcourse />} />
              <Route path="/certificate" element={<Certificate />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </div>
        </div>
      )}
    </BrowserRouter>
  );
}

export default App;
