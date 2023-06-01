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
  },
  entreprise: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Entreprise",
  },
  dateComm: {
    type: Date,
    default: () => { return new Date() } 
  },dateInsp: {
    type: Date,
    default: () => { return new Date() } 
    }


});

// Création du modèle de demande d'autorisation à partir du schéma
const Demande = mongoose.model("Demande", demande);

// Export du modèle de demande d'autorisation
module.exports = Demande;
