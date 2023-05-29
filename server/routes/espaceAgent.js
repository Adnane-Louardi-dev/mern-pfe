const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/Authmiddleware");

const {
  getDemandeEnAttente,
  DesignerDateComm,
  getDemandeApprouver,
  DesignerDateinspection,
  login,
  registerUser,
  inspection,
  getDemandeEnAttInspection,
} = require("../controllers/agents");

// login
router.post("/login", login);
// register inspecteur et instructeur

router.post("/Admin/register", protect("Administrateur"), registerUser);

//consulter les demande en attente
router.get("/Admin/Commission", protect("Administrateur"), getDemandeEnAttente);
// designer la date de commission pour une demande
router.put(
  "/Admin/Commission/:demandeId/:date",
  protect("Administrateur"),
  DesignerDateComm
);

// get list instructeure
//router.get('/Admin/Commission',protect("Administrateur"),getListInsructeur);

// designer le constructeur pour une demande
//router.put('/Admin/Commission/:demandeId/:instructeur',protect("Administrateur"),Dsignerinstructeur);

//consulter les demande en attente  approver par instruction
router.get("/Admin/Inspection", protect("Administrateur"), getDemandeApprouver);
// designer la date de inspection pour une demande
router.put(
  "/Admin/Inspection/:demandeId/:date",
  protect("Administrateur"),
  DesignerDateinspection
);

// get list instructeure
//router.get('/Admin/inspection',protect("Administrateur"),getListInspecteur);

// designer le constructeur pour une demande
//router.put('/Admin/Commission/:demandeId/:inspecteur',protect("Administrateur"),DesignerInspecteur);

// Route pour enregistrer le rapport d'inspection
//router.put('/inspections/:inspectionId/rapport',protect("Inspecteur"),enregistrerRapportInspection);

// Route pour consulter les alertes liées aux inspections
///router.get('/alertes', consulterAlertes);

//affecter les dossiers
//router.get('/affectationDossiers', affecterDossier);

//consultation
//router.get('/calendrierCommissions', ProgrammerCommi);

//gestion calendrier
//router.get('/gestionCalendrierInspection', ProgrammerInspect);

// Route pour l'évaluation du plan d'action
//router.post('/evaluationPlanAction', EvaluerPlanAction);

//consulter les demande en attente d'inspection
router.get("/inspection/getList", getDemandeEnAttInspection);

module.exports = router;
