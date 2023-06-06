import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { ListDemandes } from '../Agent_inspecteur/GetListeDemande/DemandeInspectionSlice';
import DemandeInspection from './componant/DemandeInspection'
import Navbar from '../componants/NavBar'
import RapportFrom from "./componant/RapportFrom";
const AgentInspection = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const { Agentuser } = useSelector((state) => state.auth);

  const { list, isLoading, isError, message } = useSelector(
    (state) => state.ListeDemandeAttInspection
  )

const [idDemandeRapport , setidDemandeRapport] = useState(null)

  useEffect(() => {
    if (isError) {
      console.log(message)
    }
    if (!Agentuser) {
      navigate('/espaceAgent/login')
    }
    dispatch(ListDemandes())



  }, [Agentuser, navigate, isError, message, dispatch])




  return (
    <div>
      <Navbar />
      {list.map((e) => [
        <DemandeInspection key={e._id} demande={e} setid={setidDemandeRapport} />

      ])}
     { idDemandeRapport== null ?''  :<RapportFrom  id={idDemandeRapport} setid={setidDemandeRapport}/>}
    </div>
  );
};
console.log();
export default AgentInspection;
