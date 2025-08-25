const jwt = require("jsonwebtoken");
require("dotenv").config();
const jwtSecret = process.env.JWT_SECRET;

const authenticateUser = async (req, res, next) => {
  const authToken = req.headers["auth-token"];
  console.log(authToken);
  try {
    const user = jwt.verify(authToken, jwtSecret);
    req.headers.user = user;
  } catch (error) {
    console.log(error);
    return res.status(401).json({ message: "Unauthorized" });
  }
  next();
};

module.exports = authenticateUser;
