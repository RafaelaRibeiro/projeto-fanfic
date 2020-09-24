require("dotenv").config();

const express = require("express");
const consign = require("consign");
const db = require("./config/db");
const app = express();
app.db = db;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

consign()
  .then("./config/middlewares.js")
  .then("./api/validacao.js")
  .then("./api")
  .then("./config/routes.js")
  .into(app);

app.listen(3000, () => {
  console.log("Backend executando...");
});
