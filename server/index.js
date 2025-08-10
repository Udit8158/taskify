const express = require("express");
const { default: mongoose } = require("mongoose");
require("dotenv").config();
const User = require("./models/UserSchema");
const signupRoute = require("./routes/signup");
const signinRoute = require("./routes/signin");
const cors = require("cors");
const createNewTask = require("./routes/createNewTask");
const authenticateUser = require("./middlewares/auth");
const showAllTasks = require("./routes/showAllTasks");
const deleteTask = require("./routes/deleteTask");

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

app.post("/signup", signupRoute);
app.post("/signin", signinRoute);
app.get("/tasks", authenticateUser, showAllTasks);
app.post("/tasks", authenticateUser, createNewTask);
app.delete("/task/:id", authenticateUser, deleteTask);

app.listen(port, () => console.log(`Server is running on port ${port}`));
