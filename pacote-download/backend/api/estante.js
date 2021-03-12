const prateleiras = require("./prateleiras");

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
      .join("capitulos", "estante.obraId", "capitulos.obraId")
      .leftJoin({ u: "capitulos" }, "estante.ultimoCapituloId", "u.id")
      .leftJoin("imagensObra", "obras.id", "imagensObra.obraId")
      .select(
        "estante.id",
        "estante.obraId",
        "obras.nome",
        "estante.prateleiraId",
        "imagensObra.path",
        app.db.raw(
          "case obras.prateleiraId when 5 then 'Em andamento' when 6 then 'Suspensa' when 7 then 'Terminada' else '' end as status, count(capitulos.id) as countCap, u.numero as uNumero, u.id as uId "
        )
      )
      .where({ "estante.usuarioId": req.params.usuarioId })
      .groupBy("estante.obraId", "estante.prateleiraId")
      .orderBy("obras.id", "desc")
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
      .leftJoin("capitulos", "estante.ultimoCapituloId", "capitulos.id")
      .select("estante.*", "capitulos.numero")
      .where({
        "usuarios.id": req.params.id,
        "estante.obraId": req.params.obraId,
      })
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

  const getEstantePrateleira = (req, res) => {
    app.db
      .queryBuilder()
      .select(app.db.raw("p.id,p.nome, p.tipo, ifnull(e.total,0) as total "))
      .from({ p: app.db("prateleiras").select("id", "nome", "tipo") })
      .where({ "p.tipo": "E" })
      .leftJoin(
        {
          e: app
            .db("estante")
            .select("estante.prateleiraId")
            .count({ total: "estante.id" })
            .where({ "estante.usuarioId": req.params.usuarioId })
            .groupBy("estante.prateleiraId"),
        },
        "p.id",
        "e.prateleiraId"
      )
      .then((estante) => res.json(estante))
      .catch((err) => res.status(500).send(err));
  };

  const removeEstante = async (req, res) => {
    try {
      const login = await app
        .db("estante")
        .select("id", "usuarioId")
        .where({ id: req.params.id })
        .first();

      try {
        existsOrError(login, "Obra não está na estante.");
      } catch (msg) {
        return res.status(400).send(msg);
      }

      if (login.usuarioId !== parseInt(req.params.usuarioId))
        return res.status(403).send("Você não tem permissão");

      app
        .db("estante")
        .where({ id: req.params.id })
        .del()
        .then((_) => res.status(204).send())
        .catch((err) => res.status(500).send(err));
    } catch (msg) {
      res.status(500).send(msg);
    }
  };

  const arquivarObra = async (req, res) => {
    try {
      const estante = await app
        .db("estante")
        .select("id", "usuarioId")
        .where({ id: req.params.id })
        .first();

      try {
        existsOrError(estante, "Obra não está na estante.");
      } catch (msg) {
        return res.status(400).send(msg);
      }

      if (estante.usuarioId !== parseInt(req.params.usuarioId))
        return res.status(403).send("Você não tem permissão");

      app
        .db("estante")
        .where({ id: req.params.id })
        .update({ prateleiraId: 4 })
        .then((_) => res.status(204).send())
        .catch((err) => res.status(500).send(err));
    } catch (msg) {
      res.status(500).send(msg);
    }
  };

  return {
    get,
    getById,
    save,
    getEstanteByObraId,
    getuniversosByEstante,
    updateEstante,
    getEstantePrateleira,
    removeEstante,
    arquivarObra,
  };
};
