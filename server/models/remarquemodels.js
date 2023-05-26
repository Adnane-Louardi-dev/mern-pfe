const mongoose = require('mongoose');

const remarqueSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['produit', 'rapport'],
    required: true
  },
  produit: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Produit' // Référence au modèle Produit si le type est 'produit'
  },
  rapport: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Rapport' // Référence au modèle Rapport si le type est 'rapport'
  },
  contenu: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }

  // Autres champs spécifiques aux remarques

});
const Remarque = mongoose.model('Remarque', remarqueSchema);

module.exports = Remarque;
