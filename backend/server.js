require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const db = require("./models");
const api = require("./routes/api");

//middleware
app.use(express.json());
app.use(cors());
app.use("/api", api)

db.sequelize.sync().then((req) => {
  app.listen(8000, () => {
    console.log("Server started on port 8000");
  } );
});
