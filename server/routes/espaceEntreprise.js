const express=require('express')
//const { getMaxListeners } = require('../models/demande.model')
const router=express.Router()

const {
    getDemandes,
    getDemande,
    createDemande,
    deleteDemande,
    updateDemande,
    getrapport,
    putplan,
} = require('../controllers/entreprise')


//router.use(reqAuth)

//GET all Demandes
router.get('/', getDemandes)

//GET a Demande
router.get('/:id', getDemande)

//POST a Demande
router.post('/Demande', createDemande)

//DELETE a Demande
router.delete('/:id',deleteDemande)

//consulter Rapport
router.get('/rapport/:id',getrapport) 

//plan d'action 
router.put('/plandaction',putplan)

//ajout comp
router.put('/ajoutcomp',updateDemande)


module.exports = router;
