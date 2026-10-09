const mongoose = require("mongoose");
const CabineSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: [3, "Name must be at least 3 characters"]
  },
  location:{
    type: String,
    required: true,
},
price:{
    type: Number,
    required: true,
},

Docteur: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Docteur",
    required: true
  }
});
module.exports = mongoose.model("Cabine", CabineSchema);