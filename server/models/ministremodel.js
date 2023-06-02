const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Définition du schéma du ministère
const ministereSchema = new mongoose.Schema({
  username: { 
    type: String, 
    required: true 
  },
  password: { 
    type: String,
    required: true 
  },
  email: {
    type: String,
    required: true,
    unique: true
  }
  /*nom: {
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
  }],
  produits: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Produit'
  }],
  remarques: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Remarque'
  }],
  rapports: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Rapport'
  }]*/
});

// Création du modèle du ministère à partir du schéma
const Ministere = mongoose.model('Ministere', ministereSchema);

// Export du modèle du ministère
module.exports = Ministere;
