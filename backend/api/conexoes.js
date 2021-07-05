module.exports = (app) => {
  const { equalsError, existsOrError, notExistsOrError } = app.api.validacao;

  const follow = async (req, res) => {
    const conexao = { ...req.body };
    if (req.params.usuarioId) conexao.usuarioId = req.params.usuarioId;

    const checkUser = await app
      .db("usuarios")
      .where({ id: conexao.followingId })
      .first();

    const checkConexao = await app
      .db("conexoes")
      .where({
        followingId: conexao.followingId,
        usuarioId: req.params.usuarioId,
      })
      .first();

    try {
      existsOrError(conexao.followingId, "Usuario não informado");
      equalsError(
        conexao.followingId,
        conexao.usuarioId,
        "Você não pode se seguir"
      );

      if (!checkUser) return res.status(400).send("Usuário não cadastrado");
      if (checkConexao)
        return res.status(400).send("Você já segue esse usuario");

      app
        .db("conexoes")
        .insert(conexao)
        .then((_) => res.status(240).send())
        .catch((err) => res.status(500).send(err));
    } catch (msg) {
      res.status(400).send(msg);
    }
  };

  return { follow };
};
