const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const Demande = require("../models/demandemodel.js");
const Agent = require("../models/agentsmodel.js");
const Rapport = require("../models/rapportmodels");
const ObjectId = require("mongodb").ObjectId;

// l'authentification de l'espace agent
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const agentuser = await Agent.findOne({ email });

  if (agentuser && (await bcrypt.compare(password, agentuser.password))) {
    res.json({
      _id: agentuser.id,
      name: agentuser.nom,
      lastname: agentuser.prenom,
      email: agentuser.email,
      role: agentuser.role,
      token: GenerateToken(agentuser._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid credentials");
  }
});
// la creation du compte des inspecteurs et des instructeurs par l'admin

const registerUser = asyncHandler(async (req, res) => {
  const { name, lastname, email, password, role } = req.body;
  if (!email || !name || !password || !role || !lastname) {
    res.status(400);
    throw new Error("please add all fileds ");
  }
  const userExists = await Agent.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exist ");
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const agentuser = await Agent.create({
    nom: name,
    prenom: lastname,
    email,
    password: hashedPassword,
    role,
  });
  if (agentuser) {
    res.status(201).json({
      _id: agentuser.id,
      name: agentuser.nom,
      lastname: agentuser.prenom,
      email: agentuser.email,
      role: agentuser.role,
    });
  } else {
    res.status(400);
    throw new Error("invalid user data ");
  }
});

// le racuperation des demande en attent
const getDemandeEnAttend = async (req, res) => {
  try {
    const demands = await Demande.find({ statut: "En_attente" });
    res.json(demands);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch demands en attente." });
  }
};

// l'insertion du date de commission
// l'insertion du id de l'instructeur designier par l'admin
// le changement d'etat en attent de commission
const InsertdateComm = async (req, res) => {
  const { demandId, dateComm, instructeur } = req.body;

  try {
    const demand = await Demande.findById(demandId);
    if (!demand) {
      return res.status(404).json({ message: "Demand not found." });
    }
    demand.dateComm = dateComm ? new Date(dateComm) : null;
    demand.Instructeur = instructeur;
    demand.dateInsp = null;
    demand.Inspecteur = null;
    demand.statut = "En_attente_commision ";
    await demand.save();

    res.json(demand);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to set demand fields." });
  }
};

// l'insertion du date d'inspection
// l'insertion du id de l'inspecteur designier par l'admin
// le changement d'etat en attent d'inspection

const InsertdateInspect = async (req, res) => {
  const { demandId, dateInsp, inspecteur } = req.body;

  try {
    const demand = await Demande.findById(demandId);
    if (!demand) {
      return res.status(404).json({ message: "Demand not found." });
    }
    demand.dateInsp = dateInsp ? new Date(dateInsp) : null;
    demand.Inspecteur = inspecteur;
    demand.dateComm = demand.dateComm;
    demand.Instructeur = demand.Instructeur;
    demand.statut = "En_attente_inspection";
    await demand.save();

    res.json(demand);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to set date and inspection." });
  }
};

// la recuperation des demande approuvée par l'instruction
const getDemandeApprouver = async (req, res) => {
  try {
    const demands = await Demande.find({ statut: "Approuvée" });
    res.json(demands);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch demands en attente." });
  }
};

// get list des instructeurs
const getListInsructeur = async (req, res) => {
  try {
    const agentsIst = await Agent.find({ role: "Instructeur" });
    res.json(agentsIst);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch list des instructeurs." });
  }
};

// get list des inspecteurs
const getListInnpecteur = async (req, res) => {
  try {
    const agentsInsp = await Agent.find({ role: "Inspecteur" });
    res.json(agentsInsp);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch list des inspecteurs." });
  }
};

//GenerateToken
const GenerateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

const getDemandesEnAttInspection = async (req, res) => {
  try {
    const demandes = await Demande.find({
      Inspecteur: req.user._id,
      statut: "En_attente_inspection",
    }).sort({ dateInsp: 1 });
    if (!demandes) {
      return res
        .status(404)
        .json({ message: "Pas de demandes en attente d'inspection." });
    }
    res.json(demandes);
  } catch (error) {
    res.status(500).json({ error: "probleme de la recuperation" });
  }
};
// Récupérer une demande par son ID
const getDemande = async (req, res) => {
  try {
    const demande = await Demande.findOne({
      _id: req.params.id,
      statut: "En_attente_inspection",
    });
    if (!demande) {
      return res.status(404).json({ error: "Demande non trouvée" });
    }
    res.json(demande);
  } catch (error) {
    res.status(500).json({ error: "problème de la récupération" });
  }
};

const validerRapportInspection = async (req, res) => {
  try {
    // if (!req.demandId) {
    //   return res.status(404).json({ error: "Insèrer 1 fichier au minimum" });
    // }
    //console.log(req.user.role);

    const rapport = new Rapport({
      type: "inspection", //req.user.role
      agents: new ObjectId(req.user.id), //req.user._id
      rapport: req.body.description,
    });
    await rapport.save();
    await Demande.findByIdAndUpdate(
      { _id: req.body.demandeId }, //"647268a4f3736f875b0186fc"
      {
        statut: "inspecte",
      }
    );
    res.json({ message: "avec succès" });
  } catch (error) {
    res.status(500).json({ error: "problème de la récupération" });
  }
};

module.exports = {
  getDemandeEnAttend,
  getDemandeApprouver,
  login,
  registerUser,
  InsertdateComm,
  getListInsructeur,
  getListInnpecteur,
  InsertdateInspect,
  getDemandesEnAttInspection,
  getDemande,
  validerRapportInspection,
};
