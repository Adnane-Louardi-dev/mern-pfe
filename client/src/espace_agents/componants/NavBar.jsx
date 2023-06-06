import React from 'react';
import'../Styles/NavBar.css'
import { useNavigate } from "react-router-dom";
import {useDispatch , useSelector} from 'react-redux'
import { logout ,reset  } from "../features/auth/authSlice";
const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch() ;
  const {Agentuser} = useSelector((state)=> state.auth)
  const onlogout = ()=>{
    dispatch(logout)
    dispatch(reset)
    navigate('/espaceAgent/login')
  }
 
  return (
    <div>
        <div className='navbar'>
        <div className='logo_Onsa'>
           <img src={require('../imgs/logo_onssa.jpg')} width="150px" />
        </div>
        <div className='logoContainer'>
       {Agentuser ?  <button className="fas fa-sign-out-alt" onClick={onlogout}> logout </button> : ''}
        </div>
   </div>
        
    </div>
  );
};

export default Navbar;
