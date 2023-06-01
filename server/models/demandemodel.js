const mongoose = require("mongoose");

// Définition du schéma de demande d'autorisation
const demande = new mongoose.Schema({
  type: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  file1: {
    data: Buffer,
    contentType: String,
  },
  file2: {
    data: Buffer,
    contentType: String,
  },
  dateDepot: {
    type: Date, 
    default: () => { return new Date() }
    //required: true
  },
  statut: {
    type: String,
    required: true,
    enum: [
      "En_attente",
      "En_attente_commision ",
      "En_attente_inspection",
      "Approuvée",
      "Rejetée",
      "inspecte",
    ],
    default : 'En_attente',
  },
  produit: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Produit'
  },
  entreprise: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Entreprise",
  },
  dateComm: {
    type: Date,
    default: () => { return new Date() } 
  },
  dateInsp: {
    type: Date,
    default: () => { return new Date() } 
  },
  Inspecteur:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Agent'
  },
  Instructeur:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Agent'
  },
});

// Création du modèle de demande d'autorisation à partir du schéma
const Demande = mongoose.model("Demande", demande);

// Export du modèle de demande d'autorisation
module.exports = Demande;
