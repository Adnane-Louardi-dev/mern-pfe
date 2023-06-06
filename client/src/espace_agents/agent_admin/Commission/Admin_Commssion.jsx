import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { resetDemandes ,demandeCom } from '../../features/demandes/demandeSlice'
import {resetList} from '../../features/list_Inspecteur_Instructeur/listSlice'
import {listInstructeurs} from '../../features/list_Inspecteur_Instructeur/listSlice'
import DemandeCmm from '../../componants/DemandeCmm'
import '../../Styles/DemandeCard.css'
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
  },[Agentuser , navigate , isError ,message , dispatch ])
  return (
    <div>
              <div className='headers2'>List des demandes en attente de commission</div>

        <div  className='demande'>
          {demande.map((e)=>[
            <DemandeCmm key={e._id} demande={e}  />
          ])}
        </div>
    </div>
  )
}

export default Admin_Commssion
