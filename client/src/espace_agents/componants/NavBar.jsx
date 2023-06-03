import React from 'react';
import'../Styles/NavBar.css'
const Navbar = () => {
  return (
    <div>
        <div className='navbar'>
        <div className='logo_Onsa'>
           <img src={require('../imgs/logo_onssa.jpg')} width="150px" />
        </div>
        <div className='logoContainer'>
        <button className="fas fa-sign-out-alt"> logout </button>
        </div>
   </div>
        
    </div>
  );
};

export default Navbar;
