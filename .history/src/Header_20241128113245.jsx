import React, { useState } from 'react';
import { BsFillBellFill, BsFillEnvelopeFill, BsPersonCircle, BsSearch, BsJustify } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';

function Header({ OpenSidebar, handleLogout }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
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
