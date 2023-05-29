const mongoose = require('mongoose');

const remarqueSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['produit', 'rapport'],
    required: true
  },
  produit:{
    type: String,
    required: true
  },
  contenu: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Remarque', remarqueSchema);
