import React from 'react'
import {Link} from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useState } from 'react'
import Admin_Commssion from './Commission/Admin_Commssion'
import Admin_Inspection from './inspection/Admin_Inspection'
import Register from './register/Register'
import {styles} from './../Styles/SideBarStyles'
import Navbar from '../componants/NavBar'
import Footer from '../componants/Footer'
const AgentAdmin = () => {
  const navigate = useNavigate()
  const {Agentuser} = useSelector((state)=>state.auth)
  const [page, setPage] = useState(0);
    useEffect(()=>{
      if(!Agentuser) {
        navigate('/espaceAgent/login')
      }
    })
  

  return (
   <div>
    <Navbar/>
     <div style={styles.adminPageContainer}>
     
     <div style={styles.sidebar}>
     <h1>Welcome , {Agentuser&&Agentuser.name} </h1><br />


      <button  onClick={()=>{setPage(0)}} 
      style={styles.sidebarButton}
      onMouseEnter={(e) => {
        e.target.style.backgroundColor = styles.sidebarButtonHover.backgroundColor;
        e.target.style.color = styles.sidebarButtonHover.color;
      }}
      onMouseLeave={(e) => {
        e.target.style.backgroundColor = styles.sidebarButton.backgroundColor;
        e.target.style.color = styles.sidebarButton.color;
      }}
    >
      
      Consulté demandes en attente de Commission</button> <br />
      <button  onClick={()=>{setPage(1)}}
       style={styles.sidebarButton}
       onMouseEnter={(e) => {
         e.target.style.backgroundColor = styles.sidebarButtonHover.backgroundColor;
         e.target.style.color = styles.sidebarButtonHover.color;
       }}
       onMouseLeave={(e) => {
         e.target.style.backgroundColor = styles.sidebarButton.backgroundColor;
         e.target.style.color = styles.sidebarButton.color;
       }}  >Consulté demandes en attente d'inspection </button> <br />
      <button onClick={()=>{setPage(2)}}  style={styles.sidebarButton}
          onMouseEnter={(e) => {
          e.target.style.backgroundColor = styles.sidebarButtonHover.backgroundColor;
          e.target.style.color = styles.sidebarButtonHover.color;
      }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = styles.sidebarButton.backgroundColor;
            e.target.style.color = styles.sidebarButton.color;
          }}>Register Agents</button> 
     </div>

    
      <div styles={styles.content}>
      {page === 0 ?<Admin_Commssion/> : page === 1 ? <Admin_Inspection/>  : <Register/> }
      </div>
      
  </div>
  <Footer/>
   </div>

  )
}

export default AgentAdmin
