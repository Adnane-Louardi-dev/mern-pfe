const mongoose = require('mongoose');

// Définition du schéma du ministère
const ministereSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: true,
    unique: true
  },
  ListeProduits: [{
    nom: {
      type: String,
      required: true
    },
    description: String,
    quantite: Number,
    fabricant: String,
    dateAutorisation: Date,
    dateExpiration: Date,
    status: String
  }]
});

// Création du modèle du ministère à partir du schéma
const Ministere = mongoose.model('Ministere', ministereSchema);

// Export du modèle du ministère
module.exports = Ministere;
