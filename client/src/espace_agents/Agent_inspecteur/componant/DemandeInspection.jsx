import React from 'react'

const demandeInspection = ({demande}) => {
  return (
    <div>
      <p> {demande.id} </p>
      <p> {demande.description} </p>
      <p> {demande.statut} </p>
      <p> {demande.dateInsp} </p>
      <p></p>
    </div>
  )
}

export default demandeInspection
