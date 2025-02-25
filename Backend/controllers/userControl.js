const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const privateKey = "Sanddy@123";

const signUp = async (req, res) => {
  try {
    const { username, password, email } = req.body;
    const userExists = await User.findOne({ username });

    if (userExists) {
      return res.status(400).json({
        success: false,
        message: "Username already taken",
        errorType: "USER_EXISTS",
      });
    }

    // Signup Token Part
    const newToken = jwt.sign({ username, password }, privateKey);
    if (!newToken) {
      return res.json({
        message: "Error Createing The access token",
        sucess: false,
      });
    }

    await User.create({ username, password, email });
    res.status(201).json({ success: true, message: "Signup successful",token: newToken});
    
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error, please try again later",
      errorType: "SERVER_ERROR",
    });
  }
};

const signIn = async (req, res) => {
  username = req.body.username;
  password = req.body.password;

  if (!User.findOne({ username, password })) {
    res.json({
      message: "User not found",
      sucess: false,
    });
  }

  const newToken = jwt.sign({ username, password }, privateKey);
  if (!newToken) {
    return res.json({
      message: "Error Createing The access token",
      sucess: false,
    });
  }
  res.json({
    message: "Signin Sucessfull",
    token: newToken,
    sucess: true,
  });
};

module.exports = { signUp, signIn };