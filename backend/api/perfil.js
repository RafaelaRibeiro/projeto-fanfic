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
      .column("obras.nome", { obraId: "obras.id" })
      .select()
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
      .select({
        estanteId: "estante.id",
        nome: "obras.nome",
        obraId: "obras.id",
      })
      .where({ user: req.params.user })
      .whereNot({ prateleiraId: 4 })
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

  // const uploadPerfil = (req, res) => {
  //   app
  //     .db("imagensPerfil")
  //     .insert({
  //       name: req.file.originalname,
  //       size: req.file.size,
  //       path: req.file.location,
  //       key: req.file.key,
  //       usuarioId: req.params.usuarioId,

  //     })
  //     .then((_) => res.status(204).send())
  //     .catch((err) => res.status(500).send(err));
  // };

  // const uploadPerfil = async (req, res) => {
  //   const image = { ...req.body };
  //   if (req.params.usuarioId) image.usuarioId = req.params.usuarioId;

  //   var getImage = await app
  //     .db("imagensPerfil")
  //     .select("id", "key", "usuarioId")
  //     .where({ usuarioId: req.params.usuarioId })
  //     .first();

  //   if (getImage) {
  //     await s3
  //       .deleteObject({
  //         Bucket: "upload.fanbase",
  //         Key: getImage.key

  //       })
  //       .promise();
  //     app
  //       .db("imagensPerfil")
  //       .update({
  //         name: req.file.originalname,
  //         size: req.file.size,
  //         path: req.file.location,
  //         key: req.file.key,
  //       })
  //       .where({ usuarioId: getImage.usuarioId })
  //       .then((_) => res.status(204).send())
  //       .catch((err) => res.status(500).send(err));
  //   } else {
  //     app
  //       .db("imagensPerfil")
  //       .insert({
  //         name: req.file.originalname,
  //         size: req.file.size,
  //         path: req.file.location,
  //         key: req.file.key,
  //         usuarioId: req.params.usuarioId,
  //       })
  //       .then((_) => res.status(204).send())
  //       .catch((err) => res.status(500).send(err));
  //   }
  // };

  return {
    getObrasPerfil,
    getEstantePerfil,
    getSugestoesPerfil,
    getObrasPerfilShipp,
    getPerfil,
    savePerfil,
    updateUser,
  };
};
