import React, { useState } from 'react';
import { useSelector  , useDispatch} from 'react-redux';
import {Date_instucteur} from '../features/designer_date/designer_dateSlice'
import {demandeCom} from '../features/demandes/demandeSlice'
const DemandeDetails = ({ demande }) => {
  const { list } = useSelector((state) => state.lists);
  
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const dispatch = useDispatch() 
  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };
const sendData = ()=>{
  if (demande._id && selectedDate && selectedOption){
    const data = {
      demandId :demande._id,
      dateComm : selectedDate,
      instructeur : selectedOption,
    };
    
            dispatch(Date_instucteur(data)).then(()=>{
              dispatch(demandeCom())
            })
           
  }
}
  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  return (
    <div >
      <h3 >Type: {demande.type} </h3>
      <p >Description: {demande.description} </p>
      <p >Date de Depot: {demande.dateDepot} </p>
      <p >Statut: {demande.statut} </p>
      <p >Entreprise: {demande.entreprise} </p>
      <div >
        <input type="date" name="dateCommission" onChange={handleDateChange} />
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
        <button onClick={sendData}>Send</button>
      </div>
      
    </div>
  );
};

export default DemandeDetails;
