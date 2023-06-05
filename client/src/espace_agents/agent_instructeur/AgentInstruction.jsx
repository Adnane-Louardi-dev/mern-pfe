import React, { useEffect, useState } from 'react';
import axios from 'axios';


const DemandeList = () => {
  const [demande, setDemande] = useState(null);

  const fetchDemandes = async () => {
    try {
      // Fetch "demande" objects with status "enattende" from the server
      const response = await axios.get('http://localhost:3000/espaceAgent/Instuction');
      // Set the fetched demandes in the state
      setDemande(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  

 /* const handleApprove = async (demandeId) => {
    try {
      // Update the status of the demande to "apv"
      await axios.put(`/Instruction/apv/${demandeId}`);
      
      // Refetch the updated demandes
      fetchDemandes();
    } catch (error) {
      console.error(error);
    }
  };*/

  return (
    <div>
      <h1>Demande List</h1>
      {demande.map((demande) => (
        <div key={demande._id}>
          <p>{console.log(demande)}</p>
          <p>{demande.description}</p>
          <button /*onClick={() => handleApprove(demande._id)}*/>Approve</button>
        </div>
      ))}
    </div>
  );
  
};
export default DemandeList;

