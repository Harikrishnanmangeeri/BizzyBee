const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const app = express();
const userRouter = require("./Route/user.route");
// const bodyParser = require("body-parser");
app.use(cors());
app.use(express.json());
// app.use(bodyParser.json());
app.use("/api", userRouter);
mongoose
  .connect(process.env.DATABASE_URL)
  .then(console.log("connected to database"));
app.listen(3001, () => {
  console.log("server running sucessfully");
});
