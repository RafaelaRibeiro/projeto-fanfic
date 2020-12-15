const { authSecret } = require("../e/.env");
const jwt = require("jwt-simple");
const bcrypt = require("bcrypt-nodejs");
const crypto = require("crypto");
const { StorageGateway } = require("aws-sdk");
const aws = require("aws-sdk");
const s3 = new aws.S3();
const fs = require("fs");
const mailer = require("../config/nodemailer");

module.exports = (app) => {
  const { existsOrError, notExistsOrError, equalsOrError } = app.api.validacao;

  const encryptPassword = (password) => {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
  };

  //*****************************************SAVE***************************************************** */

  const save = async (req, res) => {
    const usuario = { ...req.body };
    if (req.params.id) usuario.id = req.params.id;

    // if(!req.originalUrl.startsWith('/usuarios'))  usuario.perfil = false
    // if(!req.usuario || !req.usuario.perfil) usuario.perfil = false

    try {
      existsOrError(usuario.nome, "Nome não informado");
      existsOrError(usuario.user, "Usuario não informado");
      const checkUser = await app
        .db("usuarios")
        .where({ user: usuario.user })
        .first();
      if (!usuario.id) {
        notExistsOrError(checkUser, "Usuario já está em Uso");
      }
      existsOrError(usuario.email, "E-mail não informado");
      const userFromDB = await app
        .db("usuarios")
        .where({ email: usuario.email })
        .first();
      if (!usuario.id) {
        notExistsOrError(userFromDB, "Este e-mail já foi cadastrado");
      }

      existsOrError(usuario.password, "Senha não informada");
      existsOrError(usuario.confirmarPassword, "Necessário confirmar a senha");
      equalsOrError(
        usuario.password,
        usuario.confirmarPassword,
        "Senhas não conferem"
      );
    } catch (msg) {
      return res.status(400).send(msg);
    }

    usuario.password = encryptPassword(usuario.password);
    delete usuario.confirmarPassword;
    const token = crypto.randomBytes(20).toString("hex");
    const name = usuario.nome;
    const now = new Date();
    now.setHours(now.getHours() + 1);

    if (usuario.id) {
      app
        .db("usuarios")
        .update(usuario.nome, usuario.user)
        .where({ id: usuario.id })
        .then((_) => res.status(204).send())
        .catch((err) => res.status(500).send(err));
    } else {
      app
        .db("usuarios")
        .insert({
          nome: usuario.nome,
          email: usuario.email,
          user: usuario.user,
          password: usuario.password,
          activeToken: token,
          activeTokenExpires: now,
        })
        .then((_) => res.status(204).send())
        .catch((err) => res.status(500).send(err));

      const user = await app
        .db("usuarios")
        .where({ email: usuario.email })
        .first();

      app
        .db("imagensPerfil")
        .insert({
          name: user.nome,
          size: 0,
          path: `https://robohash.org/${user.id}?set=set4`,
          key: `${user.user}-${user.id}`,
          usuarioId: user.id,
        })
        .then((_) => res.status(204).send())
        .catch((err) => res.status(500).send(err));

      mailer.sendMail({
        to: usuario.email,
        from: "no-reply@liberfans.com",
        subject: "Ativar Cadastro",
        template: "auth/activeRegister",
        defaultLayout: false,
        context: { token, name },
      });
    }
  };

  //*****************************************GET***************************************************** */

  const getById = (req, res) => {
    app
      .db("usuarios")
      .leftJoin("imagensPerfil", "usuarios.id", "=", "imagensPerfil.usuarioId")
      .leftJoin("imagensBanner", "usuarios.id", "=", "imagensBanner.usuarioId")
      .select(
        app.db.raw(
          "usuarios.id,nome,email,user,perfil,autor,sobreMim,facebook,twitter,instagram,pinterest, spotify, imagensPerfil.path as imagePerfil, imagensBanner.path as imageBanner,dataNasc"
        )
      )

      .where({ "usuarios.id": req.params.id })
      .first()

      .then((usuario) => res.json(usuario))
      .catch((err) => res.status(500).send(err));
  };

  const get = async (req, res) => {
    app
      .db("usuarios")
      .select("id", "nome", "email", "perfil", "autor")
      .then((usuarios) => res.json(usuarios))
      .catch((err) => res.status(500).send(err));
  };

  const getUser = (req, res) => {
    app
      .db("usuarios")
      .select("user")
      .where({ user: req.params.user })
      .first()
      .then((usuarios) => res.json(usuarios))
      .catch((err) => res.status(500).send(err));
  };

  const getEmail = (req, res) => {
    app
      .db("usuarios")
      .select("email")
      .where({ email: req.params.email })
      .first()
      .then((usuarios) => res.json(usuarios))
      .catch((err) => res.status(500).send(err));
  };

  const getUserByToken = async (req, res) => {
    const usuario = await app
      .db("usuarios")
      .where({ passwordResetToken: req.params.token })
      .first();

    if (!usuario) return res.status(400).send("Usuário não encontrado!");

    app
      .db("usuarios")
      .select("nome", "passwordResetExpires", "email")
      .where({ passwordResetToken: req.params.token })
      .first()
      .then((usuario) => res.json(usuario))
      .catch((err) => res.status(500).send(err));
  };

  //*****************************************UPDATE***************************************************** */

  const updateUsuario = (req, res) => {
    const usuario = { ...req.body };
    if (req.params.id) usuario.id = req.params.id;
    app
      .db("usuarios")
      .update(usuario)
      .where({ id: usuario.id })
      .then((_) => res.status(204).send())
      .catch((err) => res.status(500).send(err));
  };

  const updatePassword = async (req, res) => {
    const user = { ...req.body };
    if (req.params.id) user.id = req.params.id;

    const usuario = await app
      .db("usuarios")
      .select("id", "email", "password")
      .where({ id: req.params.id })
      .first();

    if (!usuario) return res.status(400).send("Usuário não encontrado!");

    const isMatch = bcrypt.compareSync(req.body.password, usuario.password);
    if (!isMatch) {
      return res.status(401).send("Senha atual incorreta");
    } else {
      try {
        existsOrError(req.body.newPassword, "Nova senha não informada");
        equalsOrError(
          req.body.newPassword,
          req.body.confirmarPassword,
          "Senhas não conferem"
        );
      } catch (msg) {
        return res.status(401).send(msg);
      }

      usuario.password = encryptPassword(req.body.newPassword);
      delete usuario.confirmarPassword;

      await app
        .db("usuarios")
        .update({ password: usuario.password })
        .where({ id: usuario.id })
        .then((_) => res.status(204).send())
        .catch((err) => res.status(500).send(err));
    }
  };

  const uploadPerfil = async (req, res) => {
    const image = { ...req.body };
    if (req.params.usuarioId) image.usuarioId = req.params.usuarioId;

    var getImage = await app
      .db("imagensPerfil")
      .select("id", "key", "usuarioId")
      .where({ usuarioId: req.params.usuarioId })
      .first();

    if (getImage) {
      // await fs.unlink(`./tmp/perfil/${getImage.key}`, (err) => {
      //   if (err) throw err;
      //   console.log("File deleted!");
      // });

      await s3
        .deleteObject({
          Bucket: "upload.fanbase",
          Key: getImage.key,
        })
        .promise();
      app
        .db("imagensPerfil")
        .update({
          name: req.file.originalname,
          size: req.file.size,
          // path: `perfil/${req.params.usuarioId}/upload/${req.file.key}`,
          path: req.file.location,
          key: req.file.key,
        })
        .where({ usuarioId: getImage.usuarioId })
        .then((_) => res.status(204).send(console.log(req.file)))
        .catch((err) => res.status(500).send(err));
    } else {
      app
        .db("imagensPerfil")
        .insert({
          name: req.file.originalname,
          size: req.file.size,
          // path: `perfil/${req.params.usuarioId}/upload/${req.file.key}`,
          path: req.file.location,
          key: req.file.key,
          usuarioId: req.params.usuarioId,
        })
        .then((_) => res.status(204).send())
        .catch((err) => res.status(500).send(err));
    }
  };

  const uploadBanner = async (req, res) => {
    const image = { ...req.body };
    if (req.params.usuarioId) image.usuarioId = req.params.usuarioId;

    var getImage = await app
      .db("imagensBanner")
      .select("id", "key", "usuarioId")
      .where({ usuarioId: req.params.usuarioId })
      .first();

    if (getImage) {
      await s3
        .deleteObject({
          Bucket: "upload.fanbase",
          Key: getImage.key,
        })
        .promise();
      app
        .db("imagensBanner")
        .update({
          name: req.file.originalname,
          size: req.file.size,
          path: req.file.location,
          key: req.file.key,
        })
        .where({ usuarioId: getImage.usuarioId })
        .then((_) => res.status(204).send())
        .catch((err) => res.status(500).send(err));
    } else {
      app
        .db("imagensBanner")
        .insert({
          name: req.file.originalname,
          size: req.file.size,
          path: req.file.location,
          key: req.file.key,
          usuarioId: req.params.usuarioId,
        })
        .then((_) => res.status(204).send())
        .catch((err) => res.status(500).send(err));
    }
  };

  return {
    save,
    get,
    getById,
    updateUsuario,
    uploadPerfil,
    uploadBanner,
    updatePassword,
    getUserByToken,
    getUser,
    getEmail,
  };
};
