const express = require("express");
const mongoose =require('mongoose')
const cors = require('cors')
require('dotenv').config()
const app = express();
app.use(cors())
// mongoose.connect(process.env.DATABASE_URL).then(console.log('connected to database'))
app.listen(3001, () => {
  console.log("server running sucessfully");
});
