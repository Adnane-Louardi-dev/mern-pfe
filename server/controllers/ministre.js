const Remarque = require('../models/remarquemodel');
const Rapport = require('../models/rapportmodel');
const Produit= require('../models/produitmodel');
  
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');


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

      nouvelleRemarque.save()
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
  const { rapportId, remarque } = req.body;

  // Find the rapport in the database using the rapportId
  Rapport.findById(rapportId, (err, rapport) => {
    if (err) {
      // Handle any errors that occur during the database query
      res.status(500).json({ error: "Internal server error" });
    } else if (!rapport) {
      // If the rapport is not found, return an error response
      res.status(404).json({ error: "Rapport not found" });
    } else {
      // Create a new remarque object using the provided data
      const newRemarque = new Remarque({
        rapport: rapportId,
        contenu: remarque
      });

      // Save the new remarque in the database
      newRemarque.save((err, savedRemarque) => {
        if (err) {
          // Handle any errors that occur during the database save operation
          res.status(500).json({ error: "Internal server error" });
        } else {
          // Add the saved remarque to the rapport's list of remarques
          rapport.remarques.push(savedRemarque._id);
          rapport.save();

          // Return a success response
          res.status(200).json({ message: "Remarque sur le rapport enregistrée avec succès." });
        }
      });
    }
  });
};

const consulterRapports = (req, res) => {
  // Logique pour la consultation des rapports

  // Query the database to retrieve the list of rapports
  Rapport.find({}, (err, rapports) => {
    if (err) {
      // Handle any errors that occur during the database query
      res.status(500).json({ error: "Internal server error" });
    } else {
      // Return a success response with the list of rapports
      res.status(200).json({ rapports });
    }
  });
};
  
// Logique pour la validation du rapport d'instruction
const validerRapports = (req, res) => {
  const rapportId = req.params.id;
  const { action } = req.body;
  
  // Find the rapport by ID
  Rapport.findById(rapportId, (err, rapport) => {
    if (err) {
      // Handle any errors that occur during the database query
      res.status(500).json({ error: "Internal server error" });
    } else {
      if (rapport) {
        if (action === "validate") {
          // Update the validation status of the rapport
          rapport.valide = true;
        } else if (action === "reject") {
          // Update the validation status of the rapport
          rapport.valide = false;
        }
        
        // Save the updated rapport
        rapport.save((err) => {
          if (err) {
            // Handle any errors that occur during the save operation
            res.status(500).json({ error: "Internal server error" });
          } else {
            // Return a success response
            res.status(200).json({ message: "Rapport traité avec succès." });
          }
        });
      } else {
        // If the rapport was not found, return a not found response
        res.status(404).json({ error: "Rapport not found" });
      }
    }
  });
};

const ajouterProduit = (req, res) => {
  const { nomProduit, description, Fabricant, remarquesMinistere } = req.body;
  const imageProduit = req.file;

  // Générer un nom de fichier unique en utilisant uuid
  const nomFichier = uuidv4() + path.extname(imageProduit.originalname);

  // Déplacer l'image vers le répertoire de stockage
  fs.renameSync(imageProduit.path, path.join(__dirname, '../public/images', nomFichier));

  // Créer une instance du modèle de produit avec les données reçues
  const nouveauProduit = new Produit({
    nom: nomProduit,
    description: description,
    image: nomFichier,
    autorise: true,
    fabricant: Fabricant,
    remarques: remarquesMinistere
  });

  // Sauvegarder le nouveau produit dans la base de données
  nouveauProduit.save()
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
    saisieRemarqueProduit,
    saisieRemarqueRapports,
    consulterRapports,
    validerRapports,
    ajouterProduit
  };
  


