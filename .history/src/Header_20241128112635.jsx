import React from 'react'
import { BsFillBellFill, BsFillEnvelopeFill, BsPersonCircle, BsSearch, BsJustify } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';

function Header({ OpenSidebar }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear any authentication state (e.g., localStorage or context)
    localStorage.removeItem('user'); // Example for clearing user data
    // Redirect to the last page (assuming the last page is the login page or home page)
    navigate('/'); // You can change this to the desired route
  };

  return (
    <header className='header'>
        <div className='menu-icon'>
            <BsJustify className='icon' onClick={OpenSidebar}/>
        </div>
        <div className='header-left'>
            <BsSearch className='icon'/>
        </div>
        <div className='header-right'>
            <BsFillBellFill className='icon'/>
            <BsFillEnvelopeFill className='icon'/>
            <BsPersonCircle className='icon' onClick={handleLogout} />
        </div>
    </header>
  );
}

export default Header;
