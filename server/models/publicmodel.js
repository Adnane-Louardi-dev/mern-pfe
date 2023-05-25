const mongoose = require('mongoose');

const publicSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: true
  },
  prenom: {
    type: String,
    required: true
  },
  metier: {
    type: String,
    required: true,
  },
  commentaire: {
    type: String,
    required: true
  }
  
});

const Public = mongoose.model('Public', publicSchema);

module.exports = Public;

