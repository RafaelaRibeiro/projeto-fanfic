const autor = require("../config/autor");

module.exports = (app) => {
  const atualizacao = async (req, res) => {
    const usuarioId = await app
      .db("estante")
      .join("obras", "estante.obraId", "obras.id")
      .select("usuarioId", {
        eventoId: 2,
        obraId: req.body.obraId,
        capituloId: req.body.capituloId,
      })
      .where({ obraId: req.params.obraId })
      .groupBy("usuarioId");

    app.db
      .batchInsert("notificacoes", usuarioId)
      .then((_) => res.status(204).send())
      .catch((err) => res.status(500).send(err));
  };

  const comentario = async (req, res) => {
    const usuarioId = await app
      .db("obras")
      .select({
        usuarioId: "obras.autor",
        eventoId: 1,
        obraId: req.body.obraId,
        capituloId: req.body.capituloId,
        comentarioId: req.body.comentarioId,
        conexaoId: req.body.conexaoId,
      })
      .where({ id: req.params.obraId });

    app.db
      .batchInsert("notificacoes", usuarioId)
      .then((_) => res.status(204).send())
      .catch((err) => res.status(500).send(err));
  };

  return {
    atualizacao,
    comentario,
  };
};
