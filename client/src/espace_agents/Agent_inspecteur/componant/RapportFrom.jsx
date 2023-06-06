import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch ,useSelector} from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {AffRap} from '../SetRapport/SetRapportSlice'
import { ListDemandes } from '../GetListeDemande/DemandeInspectionSlice';
const RapportFrom = ({id , setid}) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        titre: '',
        description: '',
      });
      const {titre,description  } = formData 
  
 


  
  const onChange = (e)=>{
    setFormData((prevState)=>({
          ...prevState,
          [e.target.name]:e.target.value
      }))
  }
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const UserData = {
      demandeId:id,
        titre,
        description
      }
      console.log(UserData)
     dispatch(AffRap(UserData)).then(()=>{
      dispatch(ListDemandes())
      setid(null)
     })
   
      
  };
  return (
    <div>
        <h1>{id}</h1>
    <form onSubmit={handleSubmit} >
      <label htmlFor="titre">Titre:</label>
      <input type="text" id="titre" name="titre" value={titre} onChange={onChange} required />

      <label htmlFor="description">Rapport:</label>
      <textarea id="description" name="description" value={description} onChange={onChange} required></textarea>

     
     
      <button type="submit" >Submit</button>
    </form>
  </div>
  )
}

export default RapportFrom
