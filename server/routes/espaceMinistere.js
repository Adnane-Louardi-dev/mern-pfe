const express = require('express');
const ministereController = require('../controllers/ministre');

const router = express.Router();


// Route pour la saisie des remarques par produit
router.post('/saisie-remarque-produit', ministereController.saisieRemarqueProduit);

// Route pour la saisie des remarques sur les rapports
router.post('/saisie-remarque-rapports', ministereController.saisieRemarqueRapports);

//GET all Demandes
//router.get('/', getDemandes)

//GET a Demande
//router.get('/:id', getDemande)

//patch ajout produit
//router.put('/:id/demande',ajouterproduit)

//Ajout commentaire
//router.put('/:id/demande',Commproduit)

module.exports = router;