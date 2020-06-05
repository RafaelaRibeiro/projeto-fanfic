module.exports = (app) => {
  const save = (req, res) => {
    const estante = { ...req.body };
    if (req.params.id) estante.id = req.params.id;

    if (estante.id) {
      app
        .db("estante")
        .update(estante)
        .where({ id: estante.id })
        .then((_) => res.status(204).send())
        .catch((err) => res.status(500).send(err));
    } else {
      app
        .db("estante")
        .insert(estante)
        .then((_) => res.status(240).send())
        .catch((err) => res.status(500).send());
    }
  };

  const get = (req, res) => {
    app
      .db("estante")
      .join("obras", "estante.obraId", "=", "obras.id")
      .select("estante.id", "estante.obraId", "obras.nome", "prateleiraId")
      .where({ usuarioId: req.params.usuarioId })
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

  return { get, getById, save};
};
