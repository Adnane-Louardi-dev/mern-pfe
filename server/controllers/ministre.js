const Remarque = require('../models/remarquemodels');
const Rapport = require('../models/rapportmodels');
const Produit= require('../models/produitmodel');
const Ministere = require('../models/ministremodel'); 

const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const createMinistere = async (req, res) => {
  try {
    const { username, password , email, nom} = req.body;

    // Vérifier si le ministère de santé existe déjà
    const existingMinistere = await Ministere.findOne({ username });
    if (existingMinistere) {
      return res.status(400).json({ error: 'Ministère de santé already exists' });
    }

    // Hasher le mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Créer un nouvel objet Ministere
    const ministere = new Ministere({
      username: username,
      password: hashedPassword,
      email: email,
      nom: nom,
    });

    // Enregistrer le ministère de santé dans la base de données
    await ministere.save();

    res.status(200).json({ message: 'Compte ministère de santé créé avec succès' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message, stack: err.stack });
    //res.status(500).json({ error: err });
    //res.status(500).json({ error: 'Internal server error' });
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Rechercher le ministère de santé dans la base de données
    const ministere = await Ministere.findOne({ username });
    if (!ministere) {
      return res.status(401).json({ error: 'Authentication failed' });
    }

    // Vérifier le mot de passe
    const isPasswordValid = await bcrypt.compare(password, ministere.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Authentication failed' });
    }

    // Générer le jeton d'accès JWT
    const token = jwt.sign({ userId: ministere._id }, 'secret_key');

    // Répondre avec le jeton d'accès
    res.status(200).json({ token });
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
};


const saisieRemarqueProduit = (req, res) => {
  const { produitId, remarque } = req.body;

  //We ofc have a model named "Produit" for storing products
  Produit.findById(produitId)
    .then((produit) => {
      if (!produit) {
        // If the product is not found, return an error response
        return res.status(404).json({ message: "Product not found." });
      }
      // Create a new Remarque object and save it
      const nouvelleRemarque = new Remarque({
        produit: produitId,
        remarque: remarque,
      });

      nouvelleRemarque
        .save()
        .then(() => {
          // Remarque saved successfully
          res.status(200).json({ message: "Remarque sur le produit enregistrée avec succès." });
        })
        .catch((error) => {
          // Error occurred while saving the Remarque
          res.status(500).json({ message: "Failed to save the Remarque." });
        });
    })
    .catch((error) => {
      // Error occurred while fetching the product
      res.status(500).json({ message: "Failed to retrieve the product." });
    });
};

const saisieRemarqueRapports = (req, res) => {
  const rapportId = req.params.rapportId;

  // Find the rapport in the database using the rapportId
  Rapport.findById(rapportId)
    .then(rapport => {
      if (!rapport) {
        return res.status(404).json({ error: "Rapport not found" });
      }

      // Create a new remarque object using the provided data
      const newRemarque = new Remarque({
        type: 'rapport',
        rapport: rapportId,
        contenu: 'le rapport est bien défini',

      });

      // Save the new remarque in the database
      return newRemarque.save();
    })
    .then(savedRemarque => {
      // Add the saved remarque to the rapport's list of remarques
      rapport.remarques.push(savedRemarque._id);
      return rapport.save();
    })
    .then(() => {
      // Return a success response
      res.status(200).json({ message: "Remarque sur le rapport enregistrée avec succès." });
    })
    .catch(err => {
      // Handle any errors that occur
      res.status(500).json({ error: "Internal server error" });
    });
};


const consulterRapports = (req, res) => {
  // Logique pour la consultation des rapports

  // Query the database to retrieve the list of rapports
  Rapport.find({})
    .then(rapports => {
      // Return a success response with the list of rapports
      res.status(200).json({ rapports });
    })
    .catch(error => {
      // Handle any errors that occur during the database query
      console.error('Erreur lors de la récupération des rapports:', error);
      res.status(500).json({ error: "Internal server error" });
    });
};


// Logique pour la validation du rapport d'instruction
const validerRapports = (req, res) => {
  const rapportId = req.params.id;
  const { action } = req.body;

  // Find the rapport by ID
  Rapport.findById(rapportId)
    .then(rapport => {
      if (rapport) {
        if (action === "validate") {
          // Update the validation status of the rapport
          rapport.valide = true;
        } else if (action === "reject") {
          // Update the validation status of the rapport
          rapport.valide = false;
        }

        // Save the updated rapport
        return rapport.save();
      } else {
        // If the rapport was not found, return a not found response
        res.status(404).json({ error: "Rapport not found" });
      }
    })
    .then(() => {
      // Return a success response
      res.status(200).json({ message: "Rapport traité avec succès." });
    })
    .catch(err => {
      // Handle any errors that occur during the database query or save operation
      res.status(500).json({ error: "Internal server error" });
    });
};

const ajouterProduit = (req, res) => {
  const { nomProduit, description, Fabricant, remarquesMinistere } = req.body;
  const imageProduit = req.file;

  // Générer un nom de fichier unique en utilisant uuid
  const nomFichier = uuidv4() + path.extname(imageProduit.originalname);

  // Déplacer l'image vers le répertoire de stockage
  fs.renameSync(imageProduit.path, path.join(__dirname, "../public/images", nomFichier));

  // Créer une instance du modèle de produit avec les données reçues
  const nouveauProduit = new Produit({
    nom: nomProduit,
    description: description,
    image: nomFichier,
    autorise: true,
    fabricant: Fabricant,
    remarques: remarquesMinistere,
  });

  // Sauvegarder le nouveau produit dans la base de données
  nouveauProduit
    .save()
    .then(() => {
      // Réponse de réussite
      res.status(200).json({ message: "Produit ajouté avec succès." });
    })
    .catch((error) => {
      // En cas d'erreur, renvoyer une réponse d'erreur
      res.status(500).json({ error: error.message });
    });
};
  module.exports = {
    createMinistere,
    login,
    saisieRemarqueProduit,
    saisieRemarqueRapports,
    consulterRapports,
    validerRapports,
    ajouterProduit
  };
  