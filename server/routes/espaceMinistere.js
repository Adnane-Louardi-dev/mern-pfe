const express = require('express');
const ministereController = require('../controllers/ministre');
const upload = require('../middleware/multer');
const path = require('path');

const router = express.Router();


// Route pour la création du compte ministère de santé
router.post('/signup', ministereController.createMinistere);

// Route pour l'authentification
router.post('/login', ministereController.login);

// Route pour la saisie des remarques par produit
router.post('/saisie-remarque-produit', ministereController.saisieRemarqueProduit);

// Route pour la saisie des remarques sur les rapports
router.post('/saisie-remarque-rapports', ministereController.saisieRemarqueRapports);

// Route pour la consultation des rapports 
router.get('/rapports', ministereController.consulterRapports);

// Route pour la validation du rapport d'instruction
router.put('/valider-rapports/:id', ministereController.validerRapports);

// Route pour l'ajout d'un produit avec une image
router.post('/produits', upload.single('image'), ministereController.ajouterProduit);

module.exports = router;

