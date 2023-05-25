const Produit = require('../models/produitmodel');
const Remarque = require('../models/remarquemodel');

// Contrôleur pour consulter la liste des produits autorisés
exports.consulterProduitsAutorises = (req, res) => {
  // Récupérer la liste des produits autorisés depuis la base de données
  Produit.find({ autorise: true })
    .then(produits => {
      res.status(200).json({ produits });
    })
    .catch(error => {
      res.status(500).json({ error });
    });
};

// Contrôleur pour consulter le résumé des caractéristiques d'un produit
exports.consulterResumeCaracteristiques = (req, res) => {
  // Récupérer l'ID du produit depuis la requête
  const produitId = req.params.id;

  // Rechercher le produit par son ID dans la base de données
  Produit.findById(produitId)
    .then(produit => {
      if (!produit) {
        return res.status(404).json({ message: 'Produit non trouvé' });
      }

      res.status(200).json({ resume: produit.resumeCaracteristiques });
    })
    .catch(error => {
      res.status(500).json({ error });
    });
};

// Contrôleur pour saisir une remarque de pharmacovigilance
exports.saisirRemarquePharmacovigilance = (req, res) => {
  // Récupérer les données de la requête
  const { produitId, remarqueTexte } = req.body;

  Produit.findById(produitId)
    .then(produit => {
      if (!produit) {
        return res.status(404).json({ message: 'Produit non trouvé' });
      }

      // Créer une nouvelle remarque
      const remarque = new Remarque({
        produit: produitId,
        texte: remarqueTexte
      });
      
  // Enregistrer la remarque dans la base de données
      remarque.save()
        .then(() => {
          res.status(201).json({ message: 'Remarque enregistrée avec succès' });
        })
        .catch(error => {
          res.status(500).json({ error });
        });
    })
    .catch(error => {
      res.status(500).json({ error });
    });
};

// Contrôleur pour rechercher des produits
exports.rechercherProduits = (req, res) => {
    // Récupérer les paramètres de recherche depuis la requête
    const { keyword } = req.query;
  
    // Rechercher les produits correspondant aux critères de recherche dans la base de données
    Produit.find({ nom: { $regex: keyword, $options: 'i' } })
      .then((produits) => {
        res.status(200).json(produits);
      })
      .catch((error) => {
        res.status(500).json({ error: error.message });
      });
  };
