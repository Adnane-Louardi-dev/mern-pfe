import React from 'react'
import {Link} from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useState } from 'react'
import Admin_Commssion from './Commission/Admin_Commssion'
import Admin_Inspection from './inspection/Admin_Inspection'
import Register from './register/Register'


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
        <h1>Welcome admin {Agentuser&&Agentuser.name} </h1><br />
        <button  onClick={()=>{setPage(0)}} >Consulte demande de Commission</button> <br />
        <button  onClick={()=>{setPage(1)}}>Consulte demande d'inpection </button> <br />
        <button onClick={()=>{setPage(2)}} >register agent</button> 

      {
        /* <Link  onClick={()=>{setPage(0)}} >Consulte demande de Commission</Link> <br />
        <Link  onClick={()=>{setPage(1)}}>Consulte demande d'inpection </Link> <br />
        <Link onClick={()=>{setPage(2)}} >register agent</Link> */
      } 
        {page === 0 ?<Admin_Commssion/> : page === 1 ? <Admin_Inspection/>  : <Register/> }
    </div>

  )
}

export default AgentAdmin
