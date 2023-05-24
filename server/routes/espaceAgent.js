const express = require('express');
const router = express.Router();


import { getDemandeEnAttend, DsignerDateComm ,getListInsructeur , Dsignerinstructeur , getDemandeApprouver ,DsignerDateinspection,getListInnpecteur , getListInnpecteur } from '../Controlers/agents.js';


//consulter les demande en attente  
router.get('/Admin/Commission',getDemandeEnAttend );
// designer la date de commission pour une demande 
router.put('/Admin/Commission/:demandeId/:date',DsignerDateComm);

// get list instructeure
router.get('/Admin/Commission',getListInsructeur);

// designer le constructeur pour une demande 
router.put('/Admin/Commission/:demandeId/:instructeur',Dsignerinstructeur);

//consulter les demande en attente  approver par instruction 
router.get('/Admin/Inspection',getDemandeApprouver );
// designer la date de commission pour une demande 
router.put('/Admin/Inspection/:demandeId/:date',DsignerDateinspection);

// get list instructeure
router.get('/Admin/inspection',getListInnpecteur);

// designer le constructeur pour une demande 
router.put('/Admin/Commission/:demandeId/:inspecteur',getListInnpecteur);





// Route pour enregistrer le rapport d'inspection
router.put('/inspections/:inspectionId/rapport',enregistrerRapportInspection);

// Route pour consulter les alertes liées aux inspections
router.get('/alertes', consulterAlertes);

//affecter les dossiers
router.get('/affectation-dossiers', affecterDossier);  

//cosultation 
router.get('/calendrier-commissions', ProgrammerCommi); 

//gestion calendrier
router.get('/gestion-calendrier-inspection', ProgrammerInspect);

// Route pour l'évaluation du plan d'action  
router.post('/evaluation-plan-action', EvaluerPlanAction);

module.exports = router;