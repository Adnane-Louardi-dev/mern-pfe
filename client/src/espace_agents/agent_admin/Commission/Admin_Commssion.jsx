import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { reset ,demandeCom } from '../../features/demandes/demandeSlice'
const Admin_Commssion = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { Agentuser } = useSelector((state) => state.auth)
  const { demande, isLoading, isError, message } = useSelector(
    (state) => state.demandes
  )
  useEffect (()=>{
    if(isError){
      console.log(message)
    }
    if(!Agentuser) {
      navigate('/espaceAgent/login')
    }

    dispatch(demandeCom())
    return () => dispatch( reset())
  },[Agentuser , navigate , isError ,message , dispatch])
  return (
    <div>
      show all demande Commission
    </div>
  )
}

export default Admin_Commssion
