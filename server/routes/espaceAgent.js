const express = require('express');
const router = express.Router();

//les demandes d'autorisation
router.get('/Demande', consulterDemandes);

//demande d'autorisation
router.put('/Demande/:demandeId/traitement',traiterDemande);

// consulter les inspections
router.get('/inspections', consulterInspections);

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