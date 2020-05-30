module.exports = (app) => {
  const updateUsuario = (req, res) => {
    const usuario = { ...req.body };
    if (usuario.id) {
      app
        .db("usuarios")
        .update(usuario)
        .where({ id: usuario.id })
        .then((_) => res.status(204).send())
        .catch((err) => res.status(500).send(err));
    } else {
      app
        .db("usuarios")
        .insert(usuario)
        .then((_) => res.status(204).send())
        .catch((err) => res.status(500).send(err));
    }
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
      .column("obras.nome", { obraId: "obras.id" })
      .select()
      .where({ user: req.params.user, publica: true })
      .orderBy("obras.id", "desc")
      .then((obras) => res.json(obras))
      .catch((err) => res.status(500).send(err));
  };

  const getPerfil = (req, res) => {
    app
      .db("usuarios")
      .where({ user: req.params.user })

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
      .select("estante.id", "obras.nome")
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

  return {
    getObrasPerfil,
    getEstantePerfil,
    getSugestoesPerfil,
    getObrasPerfilShipp,
    getPerfil,
    savePerfil,

    updateUsuario,
  };
};
