import React, { useState } from 'react';
import { BsFillBellFill, BsFillEnvelopeFill, BsPersonCircle, BsSearch, BsJustify } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';

function Header({ OpenSidebar }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log('Logging out...');
    // Clear user data (make sure the key matches the stored data)
    localStorage.removeItem('user'); // Ensure the key is correct
    console.log('User data removed');

    // Navigate to the login page or the last visited page
    navigate('/');
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
