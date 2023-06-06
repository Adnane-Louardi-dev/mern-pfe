import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { resetDemandes, demandeInsp } from '../../features/demandes/demandeSlice'
import {listInspecteurs} from '../../features/list_Inspecteur_Instructeur/listSlice'
import DemandeInsp from '../../componants/DemandeInsp'
import {resetList} from '../../features/list_Inspecteur_Instructeur/listSlice'
import '../../Styles/DemandeCard.css'



const Admin_Inspection = () => {

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
    dispatch(listInspecteurs())
    dispatch(demandeInsp())
    return () =>{
      dispatch( resetDemandes())
      dispatch( resetList())
    }
  },[Agentuser , navigate , isError ,message , dispatch])



  return (
   <div>
        <div className='headers2'>List des demandes en attente d'inspection</div>
        <div className='demande'>
          
        {demande.map((e)=>[
          <DemandeInsp key={e._id} demande={e}  />
        ])}
      </div>
   </div>
  )
}

export default Admin_Inspection
