const mongoose = require("mongoose");

const rapportSchema = new mongoose.Schema({
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
    type: [String],
    default: [],
  },
  valide: {
    type: Boolean,
    default: false,
  },
  ministere: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Ministere",
  },

  // Autres champs
});

module.exports = mongoose.model("Rapport", rapportSchema);
