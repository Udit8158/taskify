const User = require("../models/user");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { comparePassword } = require("../utils/hashPassword");

const signinRoute = async (req, res) => {
  const email = req.body?.email;
  const password = req.body?.password;

  // check if user is giving the require fields
  if (!email || !password) {
    res.status(400).json({ message: "Missing required field in request" });
    return;
  }

  try {
    // find the user with email
    const foundUser = await User.findOne({ email });

    if (foundUser) {
      // check for password match
      const correctPassword = await comparePassword(
        password,
        foundUser.password
      );

      // create a auth token from user payload
      const jwtSecret = process.env.JWT_SECRET;
      const authToken = jwt.sign(
        { name: foundUser.name, email: foundUser.email },
        jwtSecret
      );

      correctPassword
        ? res.status(200).json({ message: authToken })
        : res.status(401).json({ message: "Wrong password" });
    } else {
      // user not found
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = signinRoute;
