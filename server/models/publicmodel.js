const mongoose = require('mongoose');
const Chance = require('chance');
const chance = new Chance();  // pour générer des noms et des prénoms aléatoires

const publicSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: true,
    default: chance.last()
  },
  prenom: {
    type: String,
    required: true,
    default: chance.first()
  },
  metier: {
    type: String,
    required: true
  },
  commentaire: {
    type: String,
    required: true
  }
});

const Public = mongoose.model('Public', publicSchema);

module.exports = Public;
