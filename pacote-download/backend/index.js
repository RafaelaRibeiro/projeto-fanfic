require("dotenv").config();

const express = require("express");
const consign = require("consign");
const db = require("./config/db");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const path = require("path");
const { Socket } = require("dgram");

app.db = db;

io.on("connection", (socket) => {
  socket.on("disconnect", () => {
    console.log("Usuário desconectado" + socket.id);
  });
});

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

http.listen(3000, () => {
  console.log("Backend executando...");
});
