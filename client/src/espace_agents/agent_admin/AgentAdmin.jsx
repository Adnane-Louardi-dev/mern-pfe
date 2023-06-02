import React from 'react'
import {Link} from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'


const AgentAdmin = () => {
  const navigate = useNavigate()
  const {Agentuser} = useSelector((state)=>state.auth)
    
    useEffect(()=>{
      if(!Agentuser) {
        navigate('/espaceAgent/login')
      }
    })
  

  return (
    <div>
        <h1>Welcome admin {Agentuser&&Agentuser.name} </h1><br />
        <Link to="/espaceAgent/Admin/register">register agent</Link> <br />
        <Link to="/espaceAgent/Admin/Commission">Consulte demande de Commission</Link> <br />
        <Link to="/espaceAgent/Admin/Inspection">Consulte demande d'inpection </Link>

    </div>

  )
}

export default AgentAdmin
