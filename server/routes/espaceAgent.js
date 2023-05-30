const express = require('express');
const router = express.Router();
const {protect}=require('../middleware/Authmiddleware');

const { getDemandeEnAttend  , getDemandeApprouver  , login , registerUser ,InsertdateComm ,getListInsructeur ,getListInnpecteur , InsertdateInspect} = require('../controllers/agents');

// login 
router.post('/login',login );
// register inspecteurs et instructeurs 

router.post('/Admin/register',protect("Administrateur"),registerUser );

//consulter les demandes en attented 
router.get('/Admin/Commission',protect("Administrateur"),getDemandeEnAttend );
// designer la date et l'instructeure de commission pour une demande  et changer de l'etat
router.put('/Admin/Commission',protect("Administrateur"),InsertdateComm);

// get list instructeures 
router.get('/Admin/Commission/listInstructeurs',protect("Administrateur"),getListInsructeur);

//consulter les demande en attente  approver par instruction 
router.get('/Admin/Inspection',protect("Administrateur"),getDemandeApprouver );
// designer la date et l'inspection et changer la status en attend inspection 
router.put('/Admin/inspection',protect("Administrateur"),InsertdateInspect);

// get list instructeure
router.get('/Admin/inspection/listInspecteurs',protect("Administrateur"),getListInnpecteur);

module.exports = router;