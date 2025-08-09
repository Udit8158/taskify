const express = require("express");
const { default: mongoose } = require("mongoose");
require("dotenv").config();
const User = require("./models/UserSchema");
const signupRoute = require("./routes/signup");
const signinRoute = require("./routes/signin");
const cors = require("cors");

const port = 3000;
const app = express();
const DB_URI = process.env.MONGO_URI;

mongoose
  .connect(DB_URI)
  .then(() => console.log("connected to DB"))
  .catch((err) => console.log("ERROR", err));

// Middlewares
app.use(express.json());
app.use(express.text());
app.use(cors({ origin: "http://127.0.0.1:5501" }));
// app.use((req, res, next) => {
//   console.log(req.ip);
//   const fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
//   console.log(req.header('Origin'));
//   next();
// });
// Routes
app.post("/signup", signupRoute);
app.post("/signin", signinRoute);
app.get("/todos", (req, res) => {});
app.post("/todos", (req, res) => {});

app.listen(port, () => console.log(`Server is running on port ${port}`));
