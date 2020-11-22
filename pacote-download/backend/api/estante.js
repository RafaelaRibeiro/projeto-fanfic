module.exports = (app) => {
  const { existsOrError, notExistsOrError } = app.api.validacao;

  const save = async (req, res) => {
    const shelf = { ...req.body };
    if (req.params.id) shelf.id = req.params.id;

    try {
      existsOrError(shelf.usuarioId, "Usuario não informado");
      existsOrError(shelf.obraId, "Obra não informada");

      const userFromDB = await app
        .db("estante")
        .where({ usuarioId: shelf.usuarioId, obraId: shelf.obraId })
        .first();
      if (!shelf.id) {
        notExistsOrError(userFromDB, "Obra já está na estante");
      }
    } catch (msg) {
      res.status(400).send(msg);
    }

    app
      .db("estante")
      .insert(shelf)
      .then((_) => res.status(240).send())
      .catch((err) => res.status(500).send());
  };

  const get = (req, res) => {
    app
      .db("estante")
      .join("obras", "estante.obraId", "obras.id")
      .join("usuarios", "estante.usuarioId", "usuarios.id")
      .select("estante.id", "estante.obraId", "obras.nome", "prateleiraId")
      .where({ "usuarios.user": req.params.user })
      .then((estante) => res.json(estante))
      .catch((err) => res.status(500).send(err));
  };

  const getById = (req, res) => {
    app
      .db("estante")
      .join("obras", "estante.obraId", "=", "obras.id")
      .select("estante.id", "estante.obraId", "obras.nome")
      .where({
        prateleiraId: req.params.prateleiraId,
        usuarioId: req.params.usuarioId,
      })
      .orderBy("estante.id", "desc")
      .then((estante) => res.json(estante))
      .catch((err) => res.status(500).send(err));
  };

  const getEstanteByObraId = (req, res) => {
    app
      .db("estante")
      .join("usuarios", "estante.usuarioId", "usuarios.id")
      .leftJoin("capitulos","estante.ultimoCapituloId", "capitulos.id")
      .select("estante.*", "capitulos.numero")
      .where({ "usuarios.id": req.params.id, "estante.obraId": req.params.obraId })
      .andWhere("estante.prateleiraId", "<>", 3)
      .first()
      .then((estante) => res.json(estante))
      .catch((err) => res.status(500).send(err));
  };

  const getuniversosByEstante = (req, res) => {
    app
      .db("estante")
      .join("usuarios", "estante.usuarioId", "usuarios.id")
      .join("obras", "estante.obraId", "obras.id")
      .joinRaw("LEFT JOIN fandons ON FIND_IN_SET(fandons.id, obras.fandonsId)")
      .select("fandons.id", { name: "fandons.nome" })
      .where({ "usuarios.user": req.params.user })
      .groupBy("fandons.id", "fandons.nome")
      .then((universoEstante) => res.json(universoEstante))
      .catch((err) => res.status(500).send(err));
  };

  const updateEstante = async (req, res) => {
    const shelf = { ...req.body };
    if (req.params.id) shelf.id = req.params.id;

    const estante = await app
      .db("estante")
      .select("id", "prateleiraId")
      .where({ id: req.params.id })
      .first();

    if (estante.prateleiraId === 2) {
      app
        .db("estante")
        .update({
          prateleiraId: 1,
          ultimoCapituloId: req.body.ultimoCapituloId,
        })
        .where({ id: shelf.id })
        .then((_) => res.status(204).send())
        .catch((err) => res.status(500).send(err));
    } else {
      app
        .db("estante")
        .update({ ultimoCapituloId: req.body.ultimoCapituloId })
        .where({ id: shelf.id })
        .then((_) => res.status(204).send())
        .catch((err) => res.status(500).send(err));
    }
  };

  return {
    get,
    getById,
    save,
    getEstanteByObraId,
    getuniversosByEstante,
    updateEstante,
  };
};
