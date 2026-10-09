const Docteur = require("../models/Docteur");
const mongoose = require("mongoose");

const getAll = async (req, res) => {
  try {
    const docteurs = await Docteur.find();
    res.status(200).json(docteurs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getById = async (req, res) => {
  try {
    const docteur = await Docteur.findById(req.params.id);
    if (!docteur) {
      return res.status(404).json({ message: "Docteur non trouvé" });
    }
    res.status(200).json(docteur);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getOne = async (req, res) => {
  try {
    const docteur = await Docteur.findOne({ email: req.params.email });
    if (!docteur) {
      return res.status(404).json({ message: "Docteur non trouvé" });
    }
    res.status(200).json(docteur);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const create = async (req, res) => {
  try {
    const docteur = new Docteur(req.body);
    await docteur.save();
    res.status(201).json(docteur);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const update = async (req, res) => {
  try {
    const docteur = await Docteur.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!docteur) {
      return res.status(404).json({ message: "Docteur non trouvé" });
    }
    res.status(200).json(docteur);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const remove = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Vérifier si l'ID est valide
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid docteur ID' });
    }
    
    // Trouver le docteur
    const docteur = await Docteur.findById(id);
    if (!docteur) {
      return res.status(404).json({ message: "Docteur non trouvé" });
    }
    
    // Empêcher la suppression si patient > 6
    if (docteur.patient > 6) {
      return res.status(400).json({ message: 'Cannot delete docteur with more than 6 patients' });
    }
    
    // Supprimer le docteur
    await Docteur.findByIdAndDelete(id);
    res.json({ message: 'Deleted' });
  } catch (error) {
    console.error("Erreur:", error);
    res.status(500).json({ message: error.message });
  }
};

const getByPatient = async (req, res) => {
  try {
    const docteurs = await Docteur.find({ patient: req.params.p });
    res.status(200).json(docteurs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getByPatientMin = async (req, res) => {
  try {
    const docteurs = await Docteur.find({ patient: { $gte: 4 } });
    res.status(200).json(docteurs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAll,
  getById,
  getOne,
  create,
  update,
  remove,
  getByPatient,
  getByPatientMin
};