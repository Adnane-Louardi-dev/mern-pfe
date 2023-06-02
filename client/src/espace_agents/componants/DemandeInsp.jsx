import React, { useState } from 'react';
import { useSelector } from 'react-redux';

const DemandeDetails = ({ demande }) => {
  const { list } = useSelector((state) => state.lists);
  
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedOption, setSelectedOption] = useState('');

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  return (
    <div className="demande-card">
      <h3 className="demande-type">Type: chien</h3>
      <p className="demande-description">Description: Anti-inflammatoires pour les chiens</p>
      <p className="demande-date">Date de Depot: 2023-05-27T19:22:39.574Z</p>
      <p className="demande-statut">Statut: En_attente</p>
      <p className="demande-entreprise">Entreprise: 6477523ada1fbc5456eaee13</p>
      <form onSubmit={demande._id && selectedDate && selectedOption
    ? console.log(demande._id, selectedDate, selectedOption)
    : null}>
        <input type="date" name="dateInspection" onChange={handleDateChange} />
        <select
          disabled={!list.length}
          id="Inspecteurs"
          name="Inspecteurs"
          onChange={handleOptionChange}
        >
          <option />
          {list.map((li) => (
            <option key={li._id} value={li._id}>
              {li.nom}
            </option>
          ))}
        </select>
      </form>
      
    </div>
  );
};

export default DemandeDetails;
