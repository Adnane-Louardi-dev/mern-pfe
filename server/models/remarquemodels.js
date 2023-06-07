const mongoose = require("mongoose");

const remarqueSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["produit", "rapport"],
    required: true,
  },
  produit: {
    type: String,
  },
  contenu: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});
const Remarque = mongoose.model("Remarque", remarqueSchema);

module.exports = mongoose.model("Remarque", remarqueSchema);
