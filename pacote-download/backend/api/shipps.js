module.exports = (app) => {
  const { existsOrError, notExistsOrError } = app.api.validacao;
  const save = async (req, res) => {
    const ship = { ...req.body };

    if (req.params.obraId) obra.id = req.params.obraId;

    try {
      existsOrError(ship.nome, "O nome não foi informado");
      existsOrError(ship.categoriaId, "A categoria não foi informada");
      existsOrError(ship.fandonsId, "O universo não foi informado");
    } catch (msg) {
      res.status(400).send(msg);
    }

    await app
      .db("shipp")
      .insert(ship)
      .then((_) => res.status(204).send())
      .catch((err) => res.status(500).send(err));
  };

  const getShipp = async (req, res) => {
    app
      .db("shipp")

      .then((shipp) => res.json(shipp))
      .catch((err) => res.status(500).send());
  };

  return { getShipp, save };
};
