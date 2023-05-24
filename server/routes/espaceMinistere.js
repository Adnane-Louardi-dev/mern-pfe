const express=require('express')
const router=express.Router()
router.get("/",(req,res)=>{
    res.json({data:" ministere route"})
})

//GET all Demandes
router.get('/', getDemandes)

//GET a Demande
router.get('/:id', getDemande)

//patch ajout produit
router.put('/:id/demande',ajouterproduit)

//Ajout commentaire
router.put('/:id/demande',Commproduit)

module.exports = router;