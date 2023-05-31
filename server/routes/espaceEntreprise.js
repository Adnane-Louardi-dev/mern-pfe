const express=require('express')
const { getMaxListeners } = require('../models/demandemodel')

const router=express.Router()

const {
    getDemandes,
    getDemande,
    createDemande,
    deleteDemande,
    updateDemande,
    getrapport,
    login,
    signup,
   // putplan,
} = require('../controllers/entreprise')

const reqAuth = require('../middleware/reqAuth')

//router.use(reqAuth)
router.use(reqAuth)

//login route
router.post('/login', login)

//sign up route
router.post('/signup', signup)

//GET all Demandes
router.get('/', getDemandes)

//GET a Demande
router.get('/:id', getDemande)

//POST a Demande
router.post('/Demande', createDemande)

//DELETE a Demande
router.delete('/:id',deleteDemande)

//consulter Rapport
//router.get('/rapport/:id',getrapport) 

//plan d'action
//router.put('/plandaction',putplan)

//ajout comp
router.put('/updateDemande/:id',updateDemande)



module.exports = router;
