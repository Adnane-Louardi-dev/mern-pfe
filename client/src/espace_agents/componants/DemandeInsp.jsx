import React, { useState } from 'react';
import { useSelector , useDispatch } from 'react-redux';
import {Date_inspecteur} from '../features/designer_date/designer_dateSlice'
import {demandeInsp} from '../features/demandes/demandeSlice'
import '../Styles/DemandeCard.css'
const DemandeDetails = ({ demande }) => {
  const { list } = useSelector((state) => state.lists);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const dispatch = useDispatch() 

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };
  const sendData = ()=>{
    if (demande._id && selectedDate && selectedOption){
      const data = {
        demandId :demande._id,
        dateInsp : selectedDate,
        Inspecteur : selectedOption,
      };
      
              dispatch(Date_inspecteur(data)).then(()=>{
                dispatch(demandeInsp())
              })
             
    }
  }
  const date = new Date(demande.dateDepot);
  const formattedDate = date.toLocaleString("en-GB");
  return (
    <div  className='card'>
       <div className='demande_container'>
              <div className='ename'> {demande.Nom_entreprise}</div>
              <div className='titre'> {demande.titre}</div>
              <div className='Statut'>Statut: {demande.statut}...</div>
              <div>Date de Depot {formattedDate}</div> 
              <div className='descD'> {demande.description}</div>
        </div>

        <div  className='Selections'>
         <div className='selectdate'> <input id='dateS' type="date" name="dateCommission" onChange={handleDateChange} /></div>
       <div className='selectInst'>
            <select
                disabled={!list.length}
                id="instructeurs"
                name="instructeurs"
                onChange={handleOptionChange}
              >
                <option />
                {list.map((li) => (
                  <option key={li._id} value={li._id}>
                    {li.nom}
                  </option>
                ))}
              </select>
       </div>
      </div>
      <div className='affecter'><button onClick={sendData}>Send</button></div>
    </div>
  );
};

export default DemandeDetails;
