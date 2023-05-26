const Demande = require('../models/demandemodel.js');



const getDemandeEnAttend = async (req, res) => {
    try {
      const demands = await Demande.find({ statut: 'En_attente' });
      res.json(demands);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to fetch demands en attente.' });
    }
  };


  const DsignerDateComm = async (req, res) => {
    const { demandeId } = req.params; // Assuming demandId is the parameter in the URL
    const { date } = req.params; // Assuming date is the query parameter in the URL
  
    try {
      const demand = await Demande.findById(demandeId);
      if (!demand) {
        return res.status(404).json({ message: 'Demand not found.' });
      }
  
      demand.dateComm = new Date(date);
      await demand.save();
      res.json(demand);

    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to set dateComm.' });
    }
  };
  








const getDemandeApprouver = async (req, res) => {
    try {
      const demands = await Demande.find({ statut: 'Approuvée' });
      res.json(demands);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to fetch demands en attente.' });
    }
  };



  const DsignerDateinspection = async (req, res) => {
    const { demandeId } = req.params; 
    const { date } = req.params; 
  
    try {
      const demand = await Demande.findById(demandeId);
      if (!demand) {
        return res.status(404).json({ message: 'Demand not found.' });
      }
  
      demand.dateComm = new Date(date);
      await demand.save();
      res.json(demand);

    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to set dateComm.' });
    }
  };
  


module.exports = { getDemandeEnAttend ,DsignerDateComm ,getDemandeApprouver , DsignerDateinspection };
