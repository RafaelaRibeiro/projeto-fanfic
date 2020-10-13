const multer = require("multer");
const multerConfig = require("./multer");

module.exports = (app) => {
  app.post("/signin", app.api.auth.signin);
  app.post("/validateToken", app.api.auth.validateToken);

  app.route("/usuarios").post(app.api.usuario.save).get(app.api.usuario.get);

  app.route("/categorias").get(app.api.categorias.getCategoria);

  app.route("/universos").get(app.api.universo.getUniverso);
  app.route("/avisos").get(app.api.avisos.getAvisos);
  app.route("/caracteristicas").get(app.api.caracteristicas.getCaracteristicas);

  app.route("/shipp").get(app.api.shipps.getShipp);

  app.route("/prateleiras").get(app.api.prateleiras.get);

  //**************************************Usuario*****************************************************

  app.route("/usuario/:id").get(app.api.usuario.getById);
  app.route("/usuario/:id").put(app.api.usuario.updateUsuario);
  app.route("/usuario/:id/changepassword").put(app.api.usuario.updatePassword);
  app.route("/usuario/:id/forgotPassword").put(app.api.auth.forgotPassword);
  app.route("/usuario/:id/resetPassword").put(app.api.auth.resetPassword);
  app.post(
    "/perfil/:usuarioId/upload",
    multer(multerConfig).single("file"),
    app.api.usuario.uploadPerfil
  );
  app.post(
    "/banner/:usuarioId/upload",
    multer(multerConfig).single("file"),
    app.api.usuario.uploadBanner
  );

  //**************************************Estante*****************************************************
  app.route("/:user/estante").get(app.api.estante.get);
  app
    .route("/:user/estante/prateleira/:prateleiraId")
    .get(app.api.estante.getById);
  app.route("/:user/estante/:obraId").get(app.api.estante.getEstanteByObraId);
  // app.route("/:user/estanteUniverso").get(app.api.estante.getuniversosByEstante)
  app.get("/estante/:user/universos", app.api.estante.getuniversosByEstante);
  app.route("/:user/estante/").post(app.api.estante.save);
  app.route("/estante/:id").put(app.api.estante.updateEstante);

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
    .route("/obra/:obraId/capitulo/:numero/avisos")
    .get(app.api.obras.getAvisosByCapitulo);
  app
    .route("/obra/:obraId/caracteristicas")
    .get(app.api.obras.getCaracteristicasByObra);

  app
    .route("/obra/:obraId/capitulo/:numero/comentarios")
    .get(app.api.obras.getComentarios);

  //Perfil

  app.route("/perfil/:user").put(app.api.perfil.updateUser);

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
  app.route("/mesa/:obraId/avisos").get(app.api.mesa.getAvisosByObra);

  app.post(
    "/obra/:id/upload",
    multer(multerConfig).single("file"),
    app.api.mesa.uploadObra
  );

  app.route("/mesa/:id").get(app.api.mesa.getById).delete(app.api.mesa.remove);
  app.route("/Coautor").get(app.api.mesa.getCoautor);

  app.route("/:user/obraspublicas").get(app.api.mesa.getObrasPublicas);

  app.route("/obrasTeste/:fandonsId").get(app.api.mesa.getObrasByCategoria);

  app.route("/:user/mesa/obrasprivadas").get(app.api.mesa.getObrasPrivadas);

  app.route("/:user/mesa/ultimaobra").get(app.api.mesa.getUltimaObra);

  //Minha Mesa - Capitulo

  app.route("/:user/mesa/adicionarcapitulo").post(app.api.mesa.saveCapitulo);
  app.route("/mesa/editarcapitulo/:id").put(app.api.mesa.saveCapitulo);
  app.route("/mesa/:obraId/ultimocapitulo").get(app.api.mesa.getUltimoCapitulo);

  //Minha Mesa - Notas

  app
    .route("/:user/notas")
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
