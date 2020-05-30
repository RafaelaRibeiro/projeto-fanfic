module.exports = (app) => {
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

  return { get, getById };
};
