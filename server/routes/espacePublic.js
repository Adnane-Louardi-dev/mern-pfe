const express = require('express');
const router = express.Router();

//consulter les produits
router.get('/produits', (req, res) => {
  // Logique de consultation des produits
  res.send('Consultation des produits');
});

//consuter produit
router.get('/:id', getProduit)

//recherche de produits
router.get('/recherche', (req, res) => {
  res.send('Recherche de produits');
});

// consultation des commentaires
router.get('/ commnentaire', (req, res) => {
  res.send('saisir commnentaire');
});


module.exports = router;