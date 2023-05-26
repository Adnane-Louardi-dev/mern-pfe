const express = require("express");
const router = express.Router();
const publicController = require("../controllers/public");

// Route pour consulter la liste des produits autorisés
router.get("/produits-autorises", publicController.consulterProduitsAutorises);

// Route pour consulter le résumé des caractéristiques d'un produit
router.get("/produits/:id", publicController.consulterResumeCaracteristiques);

// Route pour saisir une remarque de pharmacovigilance pour un produit
router.post("/produits/:id/remarques", publicController.saisirRemarquePharmacovigilance);

// Route pour rechercher des produits
router.get("/rechercher-produits", publicController.rechercherProduits);

module.exports = router;
