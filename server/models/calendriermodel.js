const mongoose = require('mongoose');

const calendrierSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true
  },
  type: {
    type: String,
    required: true,
    enum: ['Inspection', 'Commission']
  },
  lieu: {
    type: String,
    required: true
  },
  participants: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Utilisateur'
  }],
  role: {
    type: String,
    required: true,
    enum: ['Inspecteur', 'Instructeur']
  }

});

const Calendrier = mongoose.model('Calendrier', calendrierSchema);

module.exports = Calendrier;
