const mongoose = require('mongoose');

const exempleSchema = new mongoose.Schema({
  // Autres champs du schéma

  utilisateur: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Utilisateur',
    required: true
  }
});

module.exports = mongoose.model('Exemple', exempleSchema);