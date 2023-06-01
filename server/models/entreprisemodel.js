const mongoose = require('mongoose');

// Définition du schéma de l'entreprise
const entrepriseSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: true,
    unique : true 
  },
  email : {
    type: String,
    required: true,
    unique : true 
  },
  password:{
  type: String,
  required: true 
  },
  adresse: {
    type: String,
    required: true
  },
  specialite: {
    type: String,
    required: true
  },

  telephone: {
    type: String,
    required: true,
    unique : true 
  }//,
  /*autorisations: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Autorisation'
  }]*/
});

// Création du modèle d'entreprise à partir du schéma
const Entreprise = mongoose.model('Entreprise', entrepriseSchema);

// Export du modèle d'entreprise
module.exports = Entreprise;
  