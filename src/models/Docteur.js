const mongoose = require("mongoose");

const DocteurSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: [3, "Name must be at least 3 characters"]
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/\S+@\S+\.\S+/, "Email is invalid"]
  
  },
  phone: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  workTime: {
    type: String,
    required: true
  },
  specialty: {
    type: String,
    required: true
  },
  patient: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model("Docteur", DocteurSchema);