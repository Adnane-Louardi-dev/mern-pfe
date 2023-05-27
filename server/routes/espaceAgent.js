const express = require('express');
const router = express.Router();
const {protect}=require('../middleware/Authmiddleware');

const { getDemandeEnAttend , DsignerDateComm , getDemandeApprouver ,DsignerDateinspection , login , registerUser , inpection } = require('../controllers/agents');

// login 
router.post('/login',login );
// register inspecteur et instructeur 

 router.post('/Admin/register',protect("Administrateur"),registerUser );

 router.post('/inspection',protect("Inspecteur"),inpection );


//consulter les demande en attente  
router.get('/Admin/Commission',protect("Administrateur"),getDemandeEnAttend );
// designer la date de commission pour une demande 
router.put('/Admin/Commission/:demandeId/:date',protect("Administrateur"),DsignerDateComm);

// get list instructeure
//router.get('/Admin/Commission',protect("Administrateur"),getListInsructeur);

// designer le constructeur pour une demande 
//router.put('/Admin/Commission/:demandeId/:instructeur',protect("Administrateur"),Dsignerinstructeur);

//consulter les demande en attente  approver par instruction 
router.get('/Admin/Inspection',protect("Administrateur"),getDemandeApprouver );
// designer la date de inspection pour une demande 
router.put('/Admin/Inspection/:demandeId/:date',protect("Administrateur"),DsignerDateinspection);

// get list instructeure
//router.get('/Admin/inspection',protect("Administrateur"),getListInnpecteur);

// designer le constructeur pour une demande 
//router.put('/Admin/Commission/:demandeId/:inspecteur',protect("Administrateur"),DesignerInnpecteur);





// Route pour enregistrer le rapport d'inspection
//router.put('/inspections/:inspectionId/rapport',protect("Inspecteur"),enregistrerRapportInspection);

// Route pour consulter les alertes liées aux inspections
///router.get('/alertes', consulterAlertes);

//affecter les dossiers
//router.get('/affectation-dossiers', affecterDossier);  

//cosultation 
//router.get('/calendrier-commissions', ProgrammerCommi); 

//gestion calendrier
//router.get('/gestion-calendrier-inspection', ProgrammerInspect);

// Route pour l'évaluation du plan d'action  
//router.post('/evaluation-plan-action', EvaluerPlanAction);

module.exports = router;