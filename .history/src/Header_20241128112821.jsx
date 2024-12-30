import React, { useState } from 'react';
import { BsFillBellFill, BsFillEnvelopeFill, BsPersonCircle, BsSearch, BsJustify } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import './header.css'

function Header({ OpenSidebar }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear any authentication state (e.g., localStorage or context)
    localStorage.removeItem('user'); // Example for clearing user data
    // Redirect to the login page or any desired page
    navigate('/login');
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen); // Toggle the dropdown visibility
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
            <div className="dropdown-container">
                <BsPersonCircle className='icon' onClick={toggleDropdown} />
                {isDropdownOpen && (
                    <div className="dropdown">
                        <button onClick={handleLogout} className="dropdown-item">
                            Logout
                        </button>
                    </div>
                )}
            </div>
        </div>
    </header>
  );
}

export default Header;
