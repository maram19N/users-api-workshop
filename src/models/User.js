
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: [3, "name must be at least 3 characters"]
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/\S+@\S+\.\S+/, "Email is invalid"]
  },
  role:{
    type:String,
    enum:["user","admin"],
    default:"user"
  },
  password: {
    type: String,
    required: true,
    match: [/(^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$)/, "Password is invalid"]
  },
  phone: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("User", userSchema);
