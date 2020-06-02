const multer = require("multer");
const multerConfig = require("./multer");

module.exports = (app) => {
  app.post("/signin", app.api.auth.signin);
  app.post("/validateToken", app.api.auth.validateToken);

  app.route("/usuarios").post(app.api.usuario.save).get(app.api.usuario.get);

  app
    .route("/usuarios/:id")
    .get(app.api.usuario.getById)
    .put(app.api.usuario.save);

  app.route("/categorias").get(app.api.categorias.getCategoria);

  app.route("/universos").get(app.api.universo.getUniverso);
  app.route("/avisos").get(app.api.avisos.getAvisos);
  app.route("/caracteristicas").get(app.api.caracteristicas.getCaracteristicas);

  app.route("/shipp").get(app.api.shipps.getShipp);

  app.route("/prateleiras").get(app.api.prateleiras.get);

  app.route("/:usuarioId/estante").get(app.api.estante.get);

  //Estante

  app
    .route("/:usuarioId/estante/prateleira/:prateleiraId")
    .get(app.api.estante.getById);

  //Obras

  app
    .route("/obra/:obraId/capitulo/:numero")
    .get(app.api.obras.getByIdCapitulo)
    .post(app.api.obras.saveComentario);

  app.route("/obra/:obraId").get(app.api.obras.getByObraId);
  app.route("/obra/:obraId/capitulos").get(app.api.obras.getCapitulosByObra);
  app.route("/obra/:obraId/universos").get(app.api.obras.getUniversosByObra);
  app.route("/obra/:obraId/avisos").get(app.api.obras.getAvisosByObra);
  app
    .route("/obra/:obraId/caracteristicas")
    .get(app.api.obras.getCaracteristicasByObra);

  app
    .route("/obra/:obraId/capitulo/:numero/comentarios")
    .get(app.api.obras.getComentarios);

  //Perfil

  app.route("/perfil/:id").put(app.api.usuario.save);

  app
    .route("/perfil/:user")
    .post(app.api.perfil.savePerfil)
    .get(app.api.perfil.getPerfil);

  app.route("/perfil/:user/estante").get(app.api.perfil.getEstantePerfil);

  app.route("/perfil/:user/sugestoes").get(app.api.perfil.getSugestoesPerfil);

  app.route("/perfil/:user/obras").get(app.api.perfil.getObrasPerfil);

  app
    .route("/perfil/:autor/obras/shipp")
    .get(app.api.perfil.getObrasPerfilShipp);

  //Minha Mesa - Obra

  app.route("/:user/mesa/adicionarobra").post(app.api.mesa.save);
  app.route("/:user/mesa/editarobra/:id").put(app.api.mesa.save);

  app.post(
    "/upload/:id",
    multer(multerConfig).single("file"),
    app.api.mesa.upload
  );

  app.route("/:user/mesa/:id").get(app.api.mesa.getById);
  app.route("/Coautor").get(app.api.mesa.getCoautor);

  app.route("/:user/mesa/obraspublicas").get(app.api.mesa.getObrasPublicas);

  app.route("/obrasTeste/:fandonsId").get(app.api.mesa.getObrasByCategoria);

  app.route("/:user/mesa/obrasprivadas").get(app.api.mesa.getObrasPrivadas);

  app.route("/:user/mesa/ultimaobra").get(app.api.mesa.getUltimaObra);

  //Minha Mesa - Capitulo

  app.route("/:user/mesa/adicionarcapitulo").post(app.api.mesa.saveCapitulo);
  app.route("/mesa/:obraId/ultimocapitulo").get(app.api.mesa.getUltimoCapitulo);

  //Minha Mesa - Notas

  app
    .route("/:usuarioId/mesa/notas")
    .post(app.api.notas.save)
    .get(app.api.notas.getByUser);

  app
    .route("/:usuarioId/mesa/notas/:id")
    .put(app.api.notas.save)
    .get(app.api.notas.getById)
    .delete(app.api.notas.remove);
};

// (req, res) => {
//   console.log(req.file);
//   return res.json({ hello: "Teste" });
// }
// app.api.perfil.upload
