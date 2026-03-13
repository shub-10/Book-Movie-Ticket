const express = require('express');
const User = require('../Models/user');
const bcrypt = require('bcrypt');
const router = express.Router();
const jwt = require('jsonwebtoken');
const dotenv =  require('dotenv').config();


const badRequest = (res, message) => {
  return res.status(400).json({ success: false, message });
};

const serverError = (res, error, message) => {
  // console.error(error);
  return res.status(500).json({ success: false, message });
};

const Signup = async (req, res) => {
  try {
    const { username, password, confirmPassword } = req.body;

    if ( !username || !password || !confirmPassword)
      return badRequest(res, "All fields are mandatory");
    if(password !== confirmPassword) return badRequest(res, "Confirm password should match");
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ username, password: hashedPassword });
    return res.status(200).json({
      message: "User created successfully",
      user: {
        username: user.username,
        _id: user._id
      }
    });
  } catch (error) {
    return serverError(res, error, "Internal server error");
  }
}

const Login = async (req, res)=>{
  try {
    const {username, password} = req.body;

    if (!username || !password)
      return badRequest(res, "All fields are mandatory");

    const JWT_SECRET = process.env.JWT_SECRET;

    const user = await User.findOne({username: {$eq: username}});
    if(!user) return badRequest(res, "create account..");

    const validPassword = await bcrypt.compare(password, user.password);
    if(!validPassword) return badRequest(res, "Password didn't Match. Enter a valid one ...");

    const token = jwt.sign({id: user._id}, JWT_SECRET, {expiresIn:'1d'});
    return res.status(200).json({
      message: "LoggedIn Successfully",
      user:{
        username: user.username,
        id: user._id
      },
      token
    })
  } catch (error) {
    return serverError(res, error, "Internal server error");
  }
}
router.post('/signup', Signup);
router.post('/login', Login);

module.exports = router;