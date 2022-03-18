const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/user.model");
const { body, validationResult } = require("express-validator");
const generateToken = (user) => {
  return jwt.sign({ user }, process.env.KEY);
};

const register = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).send({ message: "Email Already Registered" });
    }

    user = await User.create(req.body);

    const token = generateToken(user);

    return res.status(200).send({ user: user, token: token });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const login = async (req, res) => {
  try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).send({ message: "Please Check Email & Password" });
    }

    const match = user.checkPassword(req.body.password);
    if (!match) {
      return res.status(400).send({ message: "Please Check Email & Password" });
    }
    const token = generateToken(user);
    return res.status(200).send({ user: user, token: token });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

module.exports = { register, login };
