const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/user.model");
const generateToken = (user) => {
  return jwt.sign({user}, process.env.KEY);
};


const register = async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    if(user) {
      return res.status(400).send({ message: "Email Already Registered" });
    }
   
  user = await User.create(req.body);
   
const token = generateToken(user);

return res.status(200).send({ user:user,token:token });
   
  } catch (error) {
    return res.status(500).send(error);
  }
};










module.exports = register;
