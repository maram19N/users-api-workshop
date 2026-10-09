const Cabine = require("../models/Cabine");
const mongoose = require("mongoose");


const getAll = async (req, res) => {
  try {
    const cabines = await Cabine.find()
      .populate("Docteur");

    res.status(200).json(cabines);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

const getById = async (req, res) => {
  try {
    const cabine = await Cabine.findById(req.params.id)
      .populate("Docteur");

    if (!cabine) {
      return res.status(404).json({
        message: "Cabine non trouvée"
      });
    }

    res.status(200).json(cabine);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

const create = async (req, res) => {
  try {
    const cabine = await Cabine.create(req.body);

    res.status(201).json(cabine);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

const update = async (req, res) => {
  try {
    const cabine = await Cabine.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!cabine) {
      return res.status(404).json({
        message: "Cabine non trouvée"
      });
    }

    res.status(200).json(cabine);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

const remove = async (req, res) => {
  try {
    const cabine = await Cabine.findByIdAndDelete(req.params.id);

    if (!cabine) {
      return res.status(404).json({
        message: "Cabine non trouvée"
      });
    }

    res.status(200).json({
      message: "Cabine supprimée avec succès"
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove
};
