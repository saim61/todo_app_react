const express = require("express");
require("dotenv").config();
const path = require("path");
const cors = require("cors");
const app = express();
const userRouter = require("./node/routes/user.routes");
const taskRouter = require("./node/routes//task.routes");
app.use(cors({ origin: true }));
app.use(express.static(path.join(__dirname, "..", "server", "dist")));
app.use(express.json());
app.use("/user", userRouter);
app.use("/task", taskRouter);
app.get("*/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "server", "dist", "index.html"));
});
module.exports = app;
