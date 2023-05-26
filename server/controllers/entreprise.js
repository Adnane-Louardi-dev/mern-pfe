const { Demande } = require('../models/demandemodel.js');

// Récupérer toutes les demandes
const getDemandes = async (req, res) => {
  try {
    const demandes = await Demande.find();
    res.json(demandes);
  } catch (error) {
    res.status(500).json({ error: 'Pas de demandes.' });
  }
};

// Récupérer une demande par son ID
const getDemande = async (req, res) => {
  try {
    const demande = await Demande.findById(req.params.id);
    if (!demande) {
      return res.status(404).json({ error: 'Demande non trouvée' });
    }
    res.json(demande);
  } catch (error) {
    res.status(500).json({ error: 'probleme de la recuperation' });
  }
};

// Créer une nouvelle demande
const createDemande = async (req, res) => {
  try {
    const demande = await Demande.create(req.body);
    res.status(201).json(demande);
  } catch (error) {
    res.status(500).json({ error: 'erreur de la création de la demande.' });
  }
};

// Mettre à jour une demande
/*const updateDemande = async (req, res) => {
  try {
    const demande = await Demande.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!demande) {
      return res.status(404).json({ error: 'Demande non trouvée.' });
    }
    res.json(demande);
  } catch (error) {
    res.status(500).json({ error: 'Une erreur est survenue lors de la mise à jour de la demande.' });
  }
};*/

// Supprimer une demande
const deleteDemande = async (req, res) => {
  try {
    const demande = await Demande.findByIdAndDelete(req.params.id);
    if (!demande) {
      return res.status(404).json({ error: 'Demande non trouvée.' });
    }
    res.json({ message: 'Demande supprimée' });
  } catch (error) {
    res.status(500).json({ error: 'erreur de la suppression de la demande.' });
  }
};

module.exports = {
  getDemandes,
  getDemande,
  createDemande,
  //updateDemande,
  deleteDemande,
};