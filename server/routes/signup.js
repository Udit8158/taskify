const User = require("../models/user")

const signupRoute = async (req, res) => {
  const name = req.body?.name;
  const email = req.body?.email;
  const password = req.body?.password;

  console.log(req.body)
  // check if user is giving the require fields
  if (!name || !email || !password) {
    res.status(400).json({ message: "Missing required field in request" });
    return;
  }

  try {
    // try to find the user
    const foundUser = await User.findOne({email})

    if (foundUser) {
        // user already exist
        res.status(409).json({message: "User with same email already exist"})
        return 
    } else {
        // create a new user and save it to db
        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
        });
    
        await newUser.save();
        res.status(201).json({ message: "User created" });
        
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = signupRoute;
