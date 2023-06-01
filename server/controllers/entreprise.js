const Demande = require('../models/demandemodel.js');
const Rapport = require('../models/rapportmodels.js');
const Entreprise = require('../models/entreprisemodel.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


// Récupérer toutes les demandes
const getDemandes = async (req, res) => {
  Demande.find(/*{ user_id }*/).sort({createAt: -1}).then((Demande)=>res.json(Demande)).catch((err)=>res.json(err))
  
}

// Récupérer une demande par son ID
const getDemande = async (req, res) => {
  Demande.findById(req.params.id).then((Demande)=>res.json(Demande)).catch((err)=>res.json(err))

};

// Créer une nouvelle demande
const createDemande =  async(req, res) => {
  Demande.create(req.body).then((Demande)=>res.json(Demande)).catch((err)=>res.json(err))
 
};

// Mettre à jour une demande
const updateDemande = async (req, res) => {
  try {
    const demande = await Demande.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!demande) {
      return res.status(404).json({ error: 'Demande non trouvée.' });
    }
    res.status(200).json(demande);
  } catch (error) {
    res.status(500).json({ error: 'Une erreur est survenue lors de la mise à jour de la demande.' });
  }
};
 
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

const getrapport = async (req, res) => {
  try {
    const rapportId = req.params.id;

    // Find the rapport in the database
    const rapport = await Rapport.findById(rapportId);

    if (!rapport) {
      return res.status(404).json({ message: 'Rapport not found' });
    }

    res.status(200).json({ rapport });
  } catch (error) {
    res.status(500).json({ message: 'erreur' });
  }
};

// Entreprise signup
const signup = async (req, res) => {
    const { nom,email, adresse, specialite, telephone, password } = req.body;
     
    if (!nom || !email || !password || !adresse || !specialite || !telephone) {
    
      res.status(400) 
      throw new Error('Veuillez saisir toutes les informations');
    }
    // Check if entreprise already exists
    const existingEntreprise = await Entreprise.findOne({ email });
    if (existingEntreprise) {
      return res.status(409).json({ message: 'entreprise deja exite' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create new entreprise
    Entreprise.create({
      nom,
      email,
      adresse,
      specialite,
      telephone,
      password: hashedPassword}).then((Entreprise)=>res.json(Entreprise)).catch((err)=>res.json(err));

};

// Entreprise login
const login =  async (req, res) => {
  try{
    const { email, password } = req.body;

    // Check if entreprise exists
    const existingEntreprise = await Entreprise.findOne({ email });
    if (!existingEntreprise) {
      return res.status(404).json({ message: 'entreprise non trouvée' });
    }

    // Compare passwords
    const isPasswordCorrect = await bcrypt.compare(password, existingEntreprise.password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: 'password incorrect' });
    }
 
    // Generate JWT token
    const token = jwt.sign(
      { userId: existingEntreprise._id },
      process.env.code_jwt,
      { expiresIn: '1h' }
    );

    res.status(200).json({ token, userId: existingEntreprise._id });
  } catch (error) {
    res.status(500).json({ message: 'erreur' });
  }
};

module.exports = {
  getDemandes,
  getDemande,
  createDemande,
  updateDemande,
  deleteDemande,
  getrapport,
  login,
  signup,
};
