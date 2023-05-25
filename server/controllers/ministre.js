const Remarque = require('../models/remarquemodel');
const Rapport = require('../models/rapportmodel');


const saisieRemarqueProduit = (req, res) => {
    const { produitId, remarque } = req.body;
  // ...

  // Réponse de réussite
  res.status(200).json({ message: "Remarque sur le produit enregistrée avec succès." });
  };
  
  const saisieRemarqueRapports = (req, res) => {
    const { rapportId, remarque } = req.body;
  // ...

  // Réponse de réussite
  res.status(200).json({ message: "Remarque sur le rapport enregistrée avec succès." });
  };
  
  const consulterRapports = (req, res) => {
    // ...

  // Réponse avec les rapports consultés
  res.status(200).json({ rapports: [/* liste des rapports consultés */] });
  };
  
  const validerRapports = (req, res) => {
    const rapportId = req.params.id;
  // ...

  // Réponse de réussite
  res.status(200).json({ message: "Rapport validé avec succès." });
  };
  
  const ajouterProduit = (req, res) => {
    const { nomProduit, description } = req.body;
  // ...

  // Réponse de réussite
  res.status(200).json({ message: "Produit ajouté avec succès." });
  };
  
  module.exports = {
    saisieRemarqueProduit,
    saisieRemarqueRapports,
    consulterRapports,
    validerRapports,
    ajouterProduit
  };
  


