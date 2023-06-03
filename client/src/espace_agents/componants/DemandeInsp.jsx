import React, { useState } from 'react';
import { useSelector , useDispatch } from 'react-redux';
import {Date_inspecteur} from '../features/designer_date/designer_dateSlice'
import {demandeCom} from '../features/demandes/demandeSlice'
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
                dispatch(demandeCom())
              })
             
    }
  }

  return (
    <div >
      <h3 >Type: {demande.type} </h3>
      <p >Description: {demande.description} </p>
      <p >Date de Depot: {demande.dateDepot} </p>
      <p >Statut: {demande.statut} </p>
      <p >Entreprise: {demande.entreprise} </p>

      <input type="date" name="dateInspection" onChange={handleDateChange} />
        <select
          disabled={!list.length}
          id="inspecteurs"
          name="inspecteurs"
          onChange={handleOptionChange}
        >
          <option />
          {list.map((li) => (
            <option key={li._id} value={li._id}>
              {li.nom}
            </option>
          ))}
        </select>
        <button onClick={sendData}>Send</button>
      
    </div>
  );
};

export default DemandeDetails;
