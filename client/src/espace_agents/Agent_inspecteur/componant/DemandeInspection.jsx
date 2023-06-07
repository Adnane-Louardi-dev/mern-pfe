import React from "react";
import "../DemandeCss.css";
const demandeInspection = ({ demande, setid }) => {
  return (
    <div className="table_responsive">
      <table>
        <thead>
          <th>Nom du Produit</th>
          <th>Entreprise</th>
          <th>Description</th>
          <th>Statut</th>
          <th>Date d'inspection</th>
        </thead>
        <tbody>
          <tr>
            <td>{demande.produit.nom}</td>
            <td>{demande.entreprise.nom}</td>
            <td>{demande.description}</td>
            <td>En Attente d'inspection </td>
            <td>{demande.dateInsp}</td>
            <td>
              <button
                className="action_btn"
                onClick={() => {
                  setid(demande._id);
                }}
              >
                ajouter rapport{" "}
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default demandeInspection;
