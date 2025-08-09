const { hashPassword } = require("../utils/hashPassword");
const User = require("../models/UserSchema");
const { z } = require("zod");

const signupRoute = async (req, res) => {
  try {
    // validate the request body
    const name = req.body?.name;
    const email = req.body?.email;
    const password = req.body?.password;

    const ValidUser = z.object({
      name: z.string().max(20).min(3),
      email: z.email().max(30).min(5),
      password: z.string().max(20).min(5),
    });

    const inputValidationResult = ValidUser.safeParse({
      name,
      email,
      password,
    });

    if (!inputValidationResult.success) {
      return res
        .status(400)
        .json({ message: inputValidationResult.error.issues });
    }
    console.log("validation passed");

    // try to find the user
    const foundUser = await User.findOne({ email });

    if (foundUser) {
      // user already exist
      res.status(409).json({ message: "User with same email already exist" });
      return;
    } else {
      const hashedPassword = await hashPassword(req.body.password);
      // create a new user and save it to db
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
      });

      await newUser.save();
      res.status(201).json({ message: "User created" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = signupRoute;
