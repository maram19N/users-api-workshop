const bcrypt = require('bcryptjs');
const User = require("../models/User");
const {Types}=require('mongoose');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;
const Token = require('../models/token');
const {validatePassword,validateEmail} = require('../utils/validateUser');

exports.getById = async(req, res) => {
  const user =await User.findById(req.params.id);
  if (!user) return res.status(404).json({ message: 'Not found' });
  res.json(user);
};
exports.getOne = async(req, res) => {
  const user =await User.findOne({email:req.params.email});
  if (!user) return res.status(404).json({ message: 'Not found' });
  res.json(user);
};




//  exports.create = (req, res) => {
//   const user = { id: users.length + 1, name: req.body.name };
//   users.push(user);
//    res.status(201).json(user);
// };
exports.create = async (req, res) => {
  const user = await User.create(req.body);
  res.json(user);
};


exports.update =async(req, res) => {
  const {id}=req.params;
  if(!Types.ObjectId.isValid(id)){
    return res.status(400).json({message:'Ivalide user Id'});
  }
  const user =await User.findByIdAndUpdate(id,req.body,{returnDocument:'after'});
  res.json(user);
};
exports.getAll = async(req, res) => {
  const users = await User.find();
  res.json(users);
};

exports.remove = async (req, res) => {
  const {id} = req.params;
  if (!Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid user ID' });
  }
  await User.findByIdAndDelete(id);
  res.json({ message: 'Deleted' });
};


exports.signUp = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;
    if (!validateEmail(email)) {
      return res.status(400).json({ message: 'Invalid email format' });
    }
    if (!validatePassword(password)) {
      return res.status(400).json({ message: 'Invalid password format' });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      phone
    });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error creating user', error });
  }
};

exports.signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }
    const token = jwt.sign(
      {userId: user._id,role: user.role },JWT_SECRET, {algorithm: 'HS256', expiresIn: '24h' }
    );
    res.json({ message: 'Signed in successfully', token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.logout = async (req, res) => {
  try {
    const authorization = req.headers.authorization;
    const token = authorization && authorization.startsWith("Bearer ") ? authorization.split(' ')[1] : null;
    if (token) {
      await Token.create({ token, expiresAt: new Date(Date.now()+24*60*60*1000) });
      
    }
    res.json({ message: 'Logged out successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error logging out', error });
  }
};