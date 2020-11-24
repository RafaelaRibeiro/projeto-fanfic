require("dotenv").config();

const express = require("express");
const consign = require("consign");
const db = require("./config/db");
const app = express();
const path = require("path");
const http = require('http');
const https = require('https');
app.db = db;

app.use(express.json());
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

const httpApp = express();
app.all('*', (req, res) => res.redirect(300, 'https://localhost:3000'));
const httpServer = http.createServer(app);
httpServer.listen(3000, () => console.log(`HTTP server listening: http://localhost`));
// app.listen(3000, () => {
//   console.log("Backend executando...");
// });
