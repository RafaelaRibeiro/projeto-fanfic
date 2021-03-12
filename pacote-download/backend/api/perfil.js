const usuario = require("./usuario");

const { StorageGateway } = require("aws-sdk");
const aws = require("aws-sdk");
const s3 = new aws.S3();
const fs = require("fs");

module.exports = (app) => {
  const updateUser = (req, res) => {
    const usuario = { ...req.body };
    if (req.params.user) usuario.user = req.params.user;
    app
      .db("usuarios")
      .update({ "usuarios.nome": usuario.nome, "usuarios.user": usuario.user })
      .where({ user: usuario.user })
      .then((_) => res.status(204).send())
      .catch((err) => res.status(500).send(err));
  };

  const savePerfil = (req, res) => {
    const usuario = { ...req.body };
    if (req.params.id) ususario.id = req.params.id;

    if (usuario.id) {
      app
        .db("usuarios")
        .update(usuario.imagemPerfil)
        .where({ user: usuario.user })
        .then((_) => res.status(204).send())
        .catch((err) => res.status(500).send(err));
    } else {
      app
        .db("usuarios")
        .insert(usuario.imagemPerfil)
        .then((_) => res.status(204).send())
        .catch((err) => res.status(500).send(err));
    }
  };

  const getObrasPerfil = (req, res) => {
    app
      .db("obras")
      .join("usuarios", "obras.autor", "=", "usuarios.id")
      .join("capitulos", "obras.id", "capitulos.obraId")
      .leftJoin("imagensObra", "obras.id", "imagensObra.obraId")
      .select({ obraId: "obras.id" }, "obras.nome", "imagensObra.path")
      .where({
        user: req.params.user,
        "obras.publica": true,
        "capitulos.publica": true,
      })
      .groupBy("obras.id")
      .orderBy("obras.id", "desc")
      .then((obras) => res.json(obras))
      .catch((err) => res.status(500).send(err));
  };

  const getPerfil = (req, res) => {
    app
      .db("usuarios")
      .leftJoin("imagensPerfil", "usuarios.id", "=", "imagensPerfil.usuarioId")
      .leftJoin("imagensBanner", "usuarios.id", "=", "imagensBanner.usuarioId")
      .select(
        app.db.raw(
          "usuarios.id,nome,email,user,perfil,autor, sobreMim,facebook, spotify, twitter, pinterest, tumblr, instagram, imagensPerfil.path as imagePerfil, imagensBanner.path as imageBanner"
        )
      )
      .where({ user: req.params.user })
      .first()

      .then((usuarios) => res.json(usuarios))
      .catch((err) => res.status(500).send(err));
  };

  const getObrasPerfilShipp = (req, res) => {
    app
      .db("obras")
      .join("shipp", "obras.shippId", "=", "shipp.id")
      .select("shipp.id", "shipp.nome")
      .count("obras.shippId as shippCount")
      .groupBy("shipp.id", "shipp.nome")
      .where({ autor: req.params.autor, publica: true })
      .orderBy("shipp.nome", "asc")
      .then((obras) => res.json(obras))
      .catch((err) => res.status(500).send(err));
  };

  const getEstantePerfil = (req, res) => {
    app
      .db("estante")
      .join("obras", "estante.obraId", "=", "obras.id")
      .join("usuarios", "estante.usuarioId", "=", "usuarios.id")
      .leftJoin("imagensObra", "obras.id", "imagensObra.obraId")
      .select(
        {
          estanteId: "estante.id",
          nome: "obras.nome",
          obraId: "obras.id",
        },
        "imagensObra.path"
      )
      .where({ user: req.params.user })
      .whereNot({ "estante.prateleiraId": 4 })
      .orderBy("estante.id", "desc")
      .then((estante) => res.json(estante))
      .catch((err) => res.status(500).send(err));
  };

  const getSugestoesPerfil = (req, res) => {
    app
      .db("estante")
      .join("obras", "estante.obraId", "=", "obras.id")
      .join("usuarios", "estante.usuarioId", "=", "usuarios.id")
      .select("estante.id", "obras.nome")
      .where({ user: req.params.user, sugerir: true })
      .orderBy("estante.id", "desc")
      .then((estante) => res.json(estante))
      .catch((err) => res.status(500).send(err));
  };

  const getSeguindoPerfil = (req, res) => {
    app
      .db("conexoes")
      .join("usuarios", "conexoes.followingId", "usuarios.Id")
      .join({ u: "usuarios" }, "conexoes.usuarioId", "u.id")
      .leftJoin("imagensBanner", "usuarios.id", "imagensBanner.usuarioId")
      .leftJoin("imagensPerfil", "usuarios.id", "imagensPerfil.usuarioId")
      .select(
        "usuarios.id",
        "usuarios.nome",
        "usuarios.user",
        { banner: "imagensBanner.path" },
        { perfil: "imagensPerfil.path" }
      )
      .where({ "u.user": req.params.user })
      .orderBy("nome", "asc")
      .then((following) => res.json(following))
      .catch((err) => res.status(500).send(err));
  };

  const getCountSeguindo = (req, res) => {
    app
      .db("conexoes")
      .join("usuarios", "conexoes.usuarioId", "usuarios.Id")
      .count({ total: "conexoes.usuarioId" })
      .where({ "usuarios.user": req.params.user })
      .first()
      .then((contFollower) => res.json(contFollower))
      .catch((err) => res.status(500).send(err));
  };

  const getSeguidoresPerfil = (req, res) => {
    app
      .db("conexoes")
      .join("usuarios", "conexoes.followingId", "usuarios.Id")
      .join({ u: "usuarios" }, "conexoes.usuarioId", "u.id")
      .leftJoin("imagensBanner", "u.id", "imagensBanner.usuarioId")
      .leftJoin("imagensPerfil", "u.id", "imagensPerfil.usuarioId")
      .select(
        "u.id",
        "u.nome",
        "u.user",
        { banner: "imagensBanner.path" },
        { perfil: "imagensPerfil.path" }
      )
      .where({ "usuarios.user": req.params.user })
      .orderBy("nome", "asc")
      .then((following) => res.json(following))
      .catch((err) => res.status(500).send(err));
  };

  const getCountSeguidores = (req, res) => {
    app
      .db("conexoes")
      .join("usuarios", "conexoes.followingId", "usuarios.Id")
      .count({ total: "conexoes.usuarioId" })
      .where({ "usuarios.user": req.params.user })
      .first()
      .then((contFollower) => res.json(contFollower))
      .catch((err) => res.status(500).send(err));
  };

  const getConexaoByUser = (req, res) => {
    app.db
      .queryBuilder()
      .select(app.db.raw("a.aUId, a.aFId, b.bUId, b.bFId"))
      .from({
        a: app
          .db("conexoes")
          .join("usuarios", "conexoes.followingId", "usuarios.id")
          .select({
            aUId: "conexoes.usuarioId",
            aFId: "conexoes.followingid",
          })
          .where({
            "conexoes.usuarioId": req.params.usuarioId,
            "usuarios.user": req.params.user,
          }),
      })

      .leftJoin(
        {
          b: app
            .db("conexoes")
            .join("usuarios", "conexoes.usuarioId", "usuarios.id")
            .select({
              bUId: "conexoes.usuarioId",
              bFId: "conexoes.followingid",
            })
            .where({
              "usuarios.user": req.params.user,
              "conexoes.followingid": req.params.usuarioId,
            }),
        },
        "a.aUId",
        "b.bFId"
      )
      .first()
      .union([
        app.db
          .queryBuilder()
          .select(app.db.raw("a.aUId, a.aFId, b.bUId, b.bFId"))
          .from({
            a: app
              .db("conexoes")
              .join("usuarios", "conexoes.followingId", "usuarios.id")
              .select({
                aUId: "conexoes.usuarioId",
                aFId: "conexoes.followingid",
              })
              .where({
                "conexoes.usuarioId": req.params.usuarioId,
                "usuarios.user": req.params.user,
              }),
          })

          .rightJoin(
            {
              b: app
                .db("conexoes")
                .join("usuarios", "conexoes.usuarioId", "usuarios.id")
                .select({
                  bUId: "conexoes.usuarioId",
                  bFId: "conexoes.followingid",
                })
                .where({
                  "usuarios.user": req.params.user,
                  "conexoes.followingid": req.params.usuarioId,
                }),
            },
            "a.aUId",
            "b.bFId"
          ),
      ])
      .then((following) => res.json(following))
      .catch((err) => res.status(500).send(err));
  };

  return {
    getObrasPerfil,
    getEstantePerfil,
    getSugestoesPerfil,
    getObrasPerfilShipp,
    getSeguindoPerfil,
    getCountSeguindo,
    getSeguidoresPerfil,
    getCountSeguidores,
    getConexaoByUser,
    getPerfil,
    savePerfil,
    updateUser,
  };
};
