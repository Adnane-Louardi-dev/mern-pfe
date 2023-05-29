const Demande = require("../models/demandemodel.js");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const Agent = require("../models/agentsmodel.js");
const jwt = require("jsonwebtoken");

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

const getDemandeEnAttente = async (req, res) => {
  try {
    const demands = await Demande.find({ statut: "En_attente" });
    res.json(demands);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch demands en attente." });
  }
};

const DesignerDateComm = async (req, res) => {
  const { demandeId } = req.params; // Assuming demandId is the parameter in the URL
  const { date } = req.params; // Assuming date is the query parameter in the URL

  try {
    const demand = await Demande.findById(demandeId);
    if (!demand) {
      return res.status(404).json({ message: "Demand not found." });
    }

    demand.dateComm = new Date(date);
    await demand.save();
    res.json(demand);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to set dateComm." });
  }
};

const getDemandeApprouver = async (req, res) => {
  try {
    const demands = await Demande.find({ statut: "Approuvée" });
    res.json(demands);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch demands en attente." });
  }
};

const DesignerDateinspection = async (req, res) => {
  const { demandeId } = req.params;
  const { date } = req.params;

  try {
    const demand = await Demande.findById(demandeId);
    if (!demand) {
      return res.status(404).json({ message: "Demand not found." });
    }

    demand.dateComm = new Date(date);
    await demand.save();
    res.json(demand);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to set dateComm." });
  }
};

//GenerateToken
const GenerateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

const inspection = (req, res) => {
  res.json({ message: "welcome to inspection" });
};

const getDemandeEnAttInspection = async (req, res) => {
  const Demandes = await Demande.find({
    statut: "En_attente_inspection",
  });
  !Demandes
    ? res.status(204).json({ message: "Aucun Demande en attente d'inspection" })
    : res.json(Demandes);
};

module.exports = {
  getDemandeEnAttente,
  DesignerDateComm,
  getDemandeApprouver,
  DesignerDateinspection,
  login,
  registerUser,
  inspection,
  getDemandeEnAttInspection,
};
