require("dotenv").config();

const express = require("express");
const consign = require("consign");
const db = require("./config/db");
const app = express();
const path = require("path")
// var redirectToHTTPS = require('express-http-to-https').redirectToHTTPS


app.db = db;

app.use(express.json());
// app.use(redirectToHTTPS([/localhost:(\d{4})/], [/\/insecure/], 301));
app.use(express.urlencoded({ extended: true }));
app.use(
  "/perfil/:id/upload",
  express.static(path.resolve(__dirname, "./tmp/perfil"))
);
app.use(
  "/banner/:id/upload",
  express.static(path.resolve(__dirname, "./tmp/perfil"))
);

consign()
  .include("./config/passport.js")
  .then("./config/middlewares.js")
  .then("./api/validacao.js")
  .then("./api")
  .then("./config/routes.js")

  .into(app);


app.listen(3000, () => {
  console.log("Backend executando...");
});
