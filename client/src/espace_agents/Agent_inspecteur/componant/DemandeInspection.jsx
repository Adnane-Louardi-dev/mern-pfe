import React from 'react'

const demandeInspection = ({demande , setid}) => {
  return (
   <div>
       <div>
          <p> {demande.description} </p>
          <p> {demande.statut} </p>
          <p> {demande.dateInsp} </p>  
          <button onClick={()=>{setid(demande._id)}}>ajouter rapport </button>
      </div>
      
   </div>
  )
}

export default demandeInspection
