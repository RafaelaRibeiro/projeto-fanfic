module.exports = (app) => {
  const { existsOrError, notExistsOrError } = app.api.validacao;

  const save = (req, res) => {
    const note = { ...req.body };
    if (req.params.id) note.id = req.params.id;

    try {
      existsOrError(note.usuarioId, "Autor não informado");
      existsOrError(note.conteudo, "Conteúdo não informado");
    } catch (msg) {
      res.status(400).send(msg);
    }

    if (note.id) {
      app
        .db("notas")
        .update(note)
        .where({ id: note.id })
        .then((_) => res.status(204).send())
        .catch((err) => res.status(500).send(err));
    } else {
      app
        .db("notas")
        .insert(note)
        .then((_) => res.status(204).send())
        .catch((err) => res.status(500).send(err));
    }
  };
  const getByUser = (req, res) => {
    app
      .db("notas")
      .select("id", "conteudo", "usuarioId")
      .where({ usuarioId: req.params.usuarioId })

      .then((note) => res.json(note))
      .catch((err) => res.status(500).send(err));
  };

  const getById = (req, res) => {
    app
      .db("notas")
      .select("id", "conteudo")
      .where({ id: req.params.id })
      .first()
      .then((user) => res.json(user))
      .catch((err) => res.status(500).send(err));
  };

  const remove = async (req, res) => {
    try {
      const rowsDeleted = await app
        .db("notas")
        .where({ id: req.params.id })
        .del();

      try {
        existsOrError(rowsDeleted, "Nota não encontrada.");
      } catch (msg) {
        return res.status(400).send(msg);
      }

      res.status(204).send();
    } catch (msg) {
      res.status(500).send(msg);
    }
  };

  return { save, getByUser, getById, remove };
};
