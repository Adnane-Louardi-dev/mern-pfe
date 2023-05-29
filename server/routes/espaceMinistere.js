const express = require('express');
const ministereController = require('../controllers/ministre');
const upload = require('../middleware/multer');
const path = require('path');

const router = express.Router();


// Route pour la saisie des remarques par produit
router.post('/saisie-remarque-produit', ministereController.saisieRemarqueProduit);

// Route pour la saisie des remarques sur les rapports
router.post('/saisie-remarque-rapports', ministereController.saisieRemarqueRapports);

//GET all Demandes
//router.get('/', getDemandes)

//GET a Demande
//router.get('/:id', getDemande)

// Route pour l'ajout d'un produit avec une image
router.post('/produits', upload.single('image'), ministereController.ajouterProduit);


module.exports = router;


