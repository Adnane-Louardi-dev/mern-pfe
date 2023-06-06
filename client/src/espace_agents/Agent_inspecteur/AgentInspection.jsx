import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const AgentInspection = () => {
  const navigate = useNavigate();
  const { Agentuser } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!Agentuser) {
      navigate("/espaceAgent/login");
    }
  });

  return (
    <div>
      <h1>Inspecteur: {Agentuser.name} </h1>
      <br />
      <Link to="/espaceAgent/Inspection/getDemandes">
        Consulter Les Demandes en attente d'Inspection
      </Link>
    </div>
  );
};
console.log();
export default AgentInspection;
