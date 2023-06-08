import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import Navbar from '../componants/NavBar'
import Footer from '../componants/Footer'

const Demands = () => {
  const [demands, setDemands] = useState([]);
  const {Agentuser} = useSelector((state)=>state.auth)

  // Fetch demands from the backend
  const fetchDemands = () => {
    fetch('http://localhost:3000/espaceAgent/Instruction')
      .then((response) => response.json())
      .then((data) => setDemands(data))
      .catch((error) => console.error('Error fetching demands:', error));
  };
  // Fetch demands with status "En_attente_commision" on component mount
  useEffect(() => {
    fetchDemands();
  }, []);

  // Handle the status update when the button is clicked
  const handleStatusUpdateapv = (id) => {
    fetch(`/espaceAgent/Instruction/apv/${id}`, {
      method: 'PUT',
    })
      .then((response) => response.json())
      .then((updatedDemand) => {
        const updatedDemands = demands.map((demand) =>
          demand._id === updatedDemand._id ? updatedDemand : demand
        );
        setDemands(updatedDemands);
        fetchDemands();
      })
      .catch((error) => console.error('Error updating demand:', error));
  };
  const handleStatusUpdaterjt = (id) => {
    fetch(`/espaceAgent/Instruction/rjt/${id}`, {
      method: 'PUT',
    })
      .then((response) => response.json())
      .then((updatedDemand) => {
        const updatedDemands = demands.map((demand) =>
          demand._id === updatedDemand._id ? updatedDemand : demand
        );
        setDemands(updatedDemands);
       
      })
      .catch((error) => console.error('Error updating demand:', error));
  };
  const handleStatusUpdatecmplt = (id) => {
    fetch(`/espaceAgent/Instruction/cmplt/${id}`, {
      method: 'PUT',
    })
      .then((response) => response.json())
      .then((updatedDemand) => {
        const updatedDemands = demands.map((demand) =>
          demand._id === updatedDemand._id ? updatedDemand : demand
        );
        setDemands(updatedDemands);
       
      })
      .catch((error) => console.error('Error updating demand:', error));
  };
   // Run the effect only once on component mount
   return (
    <div>
      <Navbar />
      <h1>Welcome, {Agentuser && Agentuser.name}</h1>
      <br />
      <h1>Liste de demandes en attende comission</h1>
      {demands
        .filter((demand) => demand.statut === 'En_attente_commision')
        .map((demand) => (
          <div
            key={demand._id}
            style={{
              display: 'flex',
              gap: '10px',
              backgroundColor: 'white',
              padding: '10px',
            }}
          >
            <div style={{ fontSize: '20px', fontWeight: 'bold', flex: 1 }}>
              {demand.description}
            </div>
            <div style={{ marginLeft: 'auto' }}>
              <button
                onClick={() => {  if (new Date(demand.dateComm) < new Date()) {
                  handleStatusUpdateapv(demand._id);
                }
  
                }}
                style={{
                  backgroundColor: 'green',
                  color: 'white',
                  padding: '10px 20px',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: new Date(demand.dateComm) < new Date() ? 'pointer' : 'not-allowed',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  marginRight: '10px', // Add margin between the buttons
                }}
                
              >
                Approver
              </button>
              <button
                onClick={() => {
                  if (new Date(demand.dateComm) < new Date()) {
                    handleStatusUpdaterjt(demand._id);
                  }
                }}
                style={{
                  backgroundColor: 'red',
                  color: 'white',
                  padding: '10px 20px',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: new Date(demand.dateComm) < new Date() ? 'pointer' : 'not-allowed',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  marginRight: '10px', // Add margin between the buttons
                }}
               
              >
                Rejter
              </button>
              //
              <button
                onClick={() => {
                  if (new Date(demand.dateComm) < new Date()) {
                    handleStatusUpdatecmplt(demand._id);
                  }
                }}
                style={{
                  backgroundColor: 'gray',
                  color: 'white',
                  padding: '10px 20px',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: new Date(demand.dateComm) < new Date() ? 'pointer' : 'not-allowed',
                  fontSize: '16px',
                  fontWeight: 'bold',
                }}
            
              >
                Incomplete
              </button>
            </div>
            <br />
          </div>
        ))}
      <Footer />
    </div>
  );
  
};

export default Demands;
