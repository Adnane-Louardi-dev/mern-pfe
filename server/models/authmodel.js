const mongoose = require('mongoose');

// Définition du schéma d'authentification
const authentificationSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  motDePasse: {
    type: String,
    required: true
  },
  utilisateur: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Utilisateur'
  }
});

// Création du modèle d'authentification à partir du schéma
const Authentification = mongoose.model('Authentification', authentificationSchema);

// Export du modèle d'authentification
module.exports = Authentification;
