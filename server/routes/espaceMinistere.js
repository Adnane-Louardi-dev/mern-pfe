const express = require('express');
const ministereController = require('../controllers/ministre');

const router = express.Router();


// Route pour la saisie des remarques par produit
router.post('/saisie-remarque-produit', ministereController.saisieRemarqueProduit);

// Route pour la saisie des remarques sur les rapports
router.post('/saisie-remarque-rapports', ministereController.saisieRemarqueRapports);

// Route pour la consultation des rapports 
router.get('/rapports', ministereController.consulterRapports);

// Route pour la validation du rapport d'instruction
router.put('/valider-rapports/:id', ministereController.validerRapports);

//patch ajout produit
router.put('/produits',ministereController.ajouterProduit)

module.exports = router;
