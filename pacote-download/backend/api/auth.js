const { authSecret } = require("../e/.env");
const jwt = require("jwt-simple");
const bcrypt = require("bcrypt-nodejs");
const crypto = require("crypto");
const mailer = require("../config/nodemailer");

module.exports = (app) => {
  const { existsOrError, notExistsOrError, equalsOrError } = app.api.validacao;

  const encryptPassword = (password) => {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
  };

  const signin = async (req, res) => {
    if (!req.body.email || !req.body.password) {
      return res.status(400).send("Informe usuário e senha!");
    }

    const usuario = await app
      .db("usuarios")
      .select("usuarios.*", app.db.raw("imagensPerfil.path as imagemPerfil, imagensBanner.path as imagemBanner"))
      .leftJoin("imagensPerfil", 'usuarios.id', "imagensPerfil.usuarioId")
      .leftJoin("imagensBanner", 'usuarios.id', "imagensBanner.usuarioId")
      .where({ email: req.body.email })
      .first();

    if (!usuario) return res.status(400).send("Usuário não encontrado!");
    if (usuario.verificado === 0)
      return res.status(400).send("Seu cadastro não foi ativado");

    const isMatch = bcrypt.compareSync(req.body.password, usuario.password);
    if (!isMatch) return res.status(406).send("Email/Senha inválidos!");

    const now = Math.floor(Date.now() / 1000);

    const payload = {
      id: usuario.id,
      nome: usuario.nome,
      email: usuario.email,
      user: usuario.user,
      perfil: usuario.perfil,
      autor: usuario.autor,
      sobreMim: usuario.sobreMim,
      facebook: usuario.facebook,
      twitter: usuario.twitter,
      instagran: usuario.instagran,
      pinterest: usuario.pinterest,
      tumblr: usuario.tumblr,
      imagemPerfil: usuario.imagemPerfil,
      imagemBanner: usuario.imagemBanner,

      dataRegistro: usuario.dataRegistro,
      dataNasc: usuario.dataNasc,

      iat: now,
      exp: now + 60 * 60 * 24 * 3,
    };

    res.json({
      ...payload,
      token: jwt.encode(payload, authSecret),
    });
  };

  const validateToken = async (req, res) => {
    const usuarioData = req.body || null;
    try {
      if (usuarioData) {
        const token = jwt.decode(usuarioData.token, authSecret);
        if (new Date(token.exp * 1000) > new Date()) {
          return res.send(true);
        }
      }
    } catch (e) {
      // problema com o token
    }

    res.send(false);
  };

  const activeRegister = async (req, res) => {
    const { token } = req.body;
    const usuario = await app
      .db("usuarios")
      .where({ activeToken: req.body.token })
      .first();
    try {
      if (token !== usuario.activeToken)
        return res.status(400).send("Token Inválido");

      const now = new Date();

      if (now > usuario.activeTokenExpires)
        return res.status(400).send("Token Expirado");
    } catch (err) {
      res.status(400).send({ error: "Erro ativar cadastro" });
    }

    await app
      .db("usuarios")
      .update({ verificado: 1 })
      .where({ id: usuario.id })
      .then((_) => res.status(204).send())
      .catch((err) => res.status(500).send(err));
  };

  const forgotPassword = async (req, res) => {
    const { email } = req.body;

    const usuario = await app
      .db("usuarios")
      .where({ email: req.body.email })
      .first();

    try {
      if (!email) return res.status(400).send("O e-mail deve ser preenchido");
      if (!usuario) return res.status(400).send("Usuário não encontrado!");
    } catch (err) {
      res
        .status(400)
        .send({ error: "Erro ao recuperar a senha, tente de novo" });
    }

    const token = crypto.randomBytes(20).toString("hex");
    const name = usuario.nome;
    const now = new Date();
    now.setHours(now.getHours() + 1);
    await app
      .db("usuarios")
      .update({ passwordResetToken: token, passwordResetExpires: now })
      .where({ id: usuario.id })

      .then((_) => res.status(204).send())
      .catch((err) => res.status(500).send(err));

    mailer.sendMail({
      to: email,
      from: "no-reply@liberfans.com",
      subject: "Redefinir Senha",
      template: "auth/forgotPassword",
      context: { token, name },
    });
  };

  const resetPassword = async (req, res) => {
    const { email, token, password } = req.body;

    const usuario = await app.db("usuarios").where({ email: email }).first();

    try {
      if (!usuario) return res.status(400).send("Usuário não encontrado!");

      if (token !== usuario.passwordResetToken)
        return res.status(400).send("Token Inválido");

      const now = new Date();

      if (now > usuario.passwordResetExpires)
        return res.status(400).send("Token Expirado");
    } catch (err) {
      res.status(400).send({ error: "Erro ao resetar a senha" });
    }

    usuario.password = encryptPassword(password);

    await app
      .db("usuarios")
      .update({ password: usuario.password })
      .where({ id: usuario.id })
      .then((_) => res.status(204).send())
      .catch((err) => res.status(500).send(err));
  };

  return {
    signin,
    validateToken,
    forgotPassword,
    resetPassword,
    activeRegister,
  };
};
