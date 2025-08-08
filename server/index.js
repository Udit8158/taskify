const express = require("express");
const { default: mongoose } = require("mongoose");
require('dotenv').config()
const User = require("./models/user");
const signupRoute = require("./routes/signup");
const signinRoute = require("./routes/signin");

const port = 3000;
const app = express();
const DB_URI = process.env.MONGO_URI;


mongoose
  .connect(DB_URI)
  .then(() => console.log("connected to DB"))
  .catch((err) => console.log("ERROR", err));

// Middlewares
app.use(express.json());

// Routes
app.post("/signup", signupRoute);
app.post("/signin", signinRoute);
app.get("/todos", (req, res) => {});
app.post("/todos", (req, res) => {});

app.listen(port, () => console.log(`Server is running on port ${port}`));
