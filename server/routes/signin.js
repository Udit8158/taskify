const User = require("../models/UserSchema");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { comparePassword } = require("../utils/hashPassword");
const { default: z } = require("zod");

const signinRoute = async (req, res) => {
  try {
    // validate the request body
    const email = req.body?.email;
    const password = req.body?.password;

    const ValidUser = z.object({
      email: z.email().max(30).min(5),
      password: z.string().max(20).min(5),
    });

    const inputValidationResult = ValidUser.safeParse({
      email,
      password,
    });

    if (!inputValidationResult.success) {
      return res
        .status(400)
        .json({ message: inputValidationResult.error.issues });
    }
    console.log("validation passed");

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
