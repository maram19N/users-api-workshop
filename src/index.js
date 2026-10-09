
require("dotenv").config();
const express = require('express');
const userRoutes = require('./routes/user.routes');
const docteurRoutes = require('./routes/docteur.routes.js');
// const tokenRoutes =require( "./routes/token.routes");
const cabineRoutes = require("./routes/cabine.routres.js");

const mongoose = require("mongoose");
const app = express();


app.use(express.json());
app.use('/api/users', userRoutes);
app.use('/api/docteurs', docteurRoutes);
// app.use('/api/tokens', tokenRoutes);
app.use('/api/cabines', cabineRoutes);

mongoose.connect("mongodb://127.0.0.1:27017/restaurantDB")
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
