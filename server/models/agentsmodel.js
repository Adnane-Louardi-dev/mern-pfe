const mongoose = require('mongoose');

// Définition du schéma de l'agent
const agentSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: true
  },
  prenom: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  role: {
    type: String,
    required: true,
    enum: ['Administrateur', 'Inspecteur', 'Instructeur']
  },
  ministere: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Ministere'
  }
});

// Création du modèle de l'agent à partir du schéma
const Agent = mongoose.model('Agent', agentSchema);

// Export du modèle de l'agent
module.exports = Agent;
