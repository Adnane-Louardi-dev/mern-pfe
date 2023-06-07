const mongoose = require("mongoose");

const rapportSchema = new mongoose.Schema({
  titre: {
    type: String,
    required: true,
  },
  contenu: {
    type: String,
  },
  type: {
    type: String,
    enum: ["instruction", "inspection"],
    required: true,
  },
  agents: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Agent",
  },
  rapport: {
    type: String,
    maxlength: 10000,
    required: true,
  },
  dateCreation: {
    type: Date,
    default: Date.now,
  },
  //remarques faites par le ministère de santé
  remarques: {
    type: Array,
    default: [],
  },
  valide: {
    type: Boolean,
    default: null,
  },
  ministere: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Ministere",
  },
});

module.exports = mongoose.model("Rapport", rapportSchema);
