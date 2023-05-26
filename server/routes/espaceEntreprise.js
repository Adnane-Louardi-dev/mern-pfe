const express=require('express')
const { getMaxListeners } = require('../models/demandemodel')
const router=express.Router()
router.get("/",(req,res)=>{
    res.json({data:"entreprise route"})
})

//router.use(reqAuth)

//GET all Demandes
//router.get('/', getDemandes)

//GET a Demande
//router.get('/:id', getDemande)

//POST a Demande
//router.post('/Demande', createDemande)

//DELETE a Demande
//router.delete('/:id',deleteDemande)

//consulter Rapport
//router.get('/rapport/:id',getrapport) 

//plan d'action
//router.put('/plandaction',putplan)

//ajout comp
//router.put('/ajoutcomp',putComp)


module.exports = router;