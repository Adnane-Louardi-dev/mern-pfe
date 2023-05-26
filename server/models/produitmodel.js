const mongoose = require("mongoose");
const Entreprise = require("./entreprisemodel");
const produitSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  autorise: {
    type: Boolean,
    default: false,
  },
  //remarques faites par le ministère de santé
  remarques: {
    type: [String],
    default: [],
  },
  fabricant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Entreprise",
  },
  ministere: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Ministere",
  },
});

const Produit = mongoose.model("Produit", produitSchema);

module.exports = Produit;
