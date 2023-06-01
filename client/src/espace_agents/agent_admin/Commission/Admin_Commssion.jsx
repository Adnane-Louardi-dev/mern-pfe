import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { resetDemandes ,demandeCom } from '../../features/demandes/demandeSlice'
import {resetList} from '../../features/list_Inspecteur_Instructeur/listSlice'
import {listInstructeurs} from '../../features/list_Inspecteur_Instructeur/listSlice'
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
    dispatch(listInstructeurs())
    dispatch(demandeCom())
    return () => {
      dispatch( resetDemandes())
      dispatch( resetList())

    }
  },[Agentuser , navigate , isError ,message , dispatch])
  return (
    <div>
      show all demande Commission
    </div>
  )
}

export default Admin_Commssion
