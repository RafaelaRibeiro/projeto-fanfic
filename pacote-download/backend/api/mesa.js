module.exports = (app) => {
  const { existsOrError, notExistsOrError } = app.api.validacao;
  //  Obras
  const save = (req, res) => {
    const obra = { ...req.body };
    if (req.params.id) obra.id = req.params.id;

    try {
      existsOrError(obra.nome, "Título não informado");
      existsOrError(obra.categoriaId, "Categoria não Informada");
      existsOrError(obra.classificacao, "Classificação não informada");
      existsOrError(obra.sinopse), "Sinopse não Informada";
    } catch (msg) {
      res.status(400).send(msg);
    }

    if (obra.id) {
      app
        .db("obras")
        .update(obra)
        .where({ id: obra.id })
        .then((_) => res.status(204).send())
        .catch((err) => res.status(500).send(err));
    } else {
      app
        .db("obras")
        .insert(obra)
        .then((_) => res.status(240).send())
        .catch((err) => res.status(500).send());
    }
  };

  const getById = (req, res) => {
    app
      .db("obras")
      .join("usuarios", "obras.autor", "usuarios.id")
      .select("obras.*")
      .where({ "obras.id": req.params.id, "usuarios.user": req.params.user })
      .first()
      .then((obra) => res.json(obra))
      .catch((err) => res.status(500).send(err));
  };

  const getCoautor = (req, res) => {
    app
      .db("usuarios")
      .select("user")
      .where({ autor: true })
      .orderBy("nome", "asc")
      .then((user) => res.json(user))
      .catch((err) => res.status(500).send());
  };

  const getUltimaObra = (req, res) => {
    const query = app
      .db("obras")
      .join("usuarios", "obras.autor", "=", "usuarios.id")
      .where({ user: req.params.user })
      .max("obras.id");
    app
      .db("obras")
      .join("usuarios", "obras.autor", "=", "usuarios.id")
      .select("obras.*")
      .where({ user: req.params.user, "obras.id": query })

      .then((obras) => res.json(obras))
      .catch((err) => res.status(500).send(err));
  };

  const getObrasPublicas = (req, res) => {
    app
      .db("obras")
      .join("usuarios", "obras.autor", "=", "usuarios.id")
      .leftJoin("capitulos", "obras.id", "capitulos.obraId")
      .leftJoin("imagemObras", "obras.id", "imagemObras.obraId")
      .select(
        app.db.raw(
          "obras.id,obras.nome,obras.publica,obras.categoriaId,obras.fandonsId,obras.shippPrincipal,obras.shippSecundario, obras.classificacao,   obras.terminada, date_format(dataAdicionado, '%d/%m/%Y %H:%i:%s')as dataAdicionado, imagemObras.key"
        )
      )
      .count("capitulos.id", { as: "countCap" })
      .where({ user: req.params.user, "obras.publica": true })
      .groupBy("obras.id")
      .orderBy("obras.id", "desc")
      .then((obras) => res.json(obras))
      .catch((err) => res.status(500).send(err));
  };

  const getObrasPrivadas = (req, res) => {
    app
      .db("obras")
      .join("usuarios", "obras.autor", "=", "usuarios.id")
      .select("obras.*")
      .where({ user: req.params.user, publica: false })
      .orderBy("obras.id", "desc")
      .then((obras) => res.json(obras))
      .catch((err) => res.status(500).send(err));
  };

  const getObrasByCategoria = (req, res) => {
    app
      .db("obras")
      .whereRaw("json_CONTAINS(fandonsId,:fandonsId)", {
        fandonsId: req.params.fandonsId,
      })
      .then((obra) => res.json(obra))
      .catch((err) => res.status(500).send());
  };

  //Capitulos

  const saveCapitulo = (req, res) => {
    const capitulo = { ...req.body };
    if (req.params.id) capitulo.id = req.params.id;

    try {
      existsOrError(capitulo.conteudo, "Conteudo não Informada");
      existsOrError(capitulo.obraId, "Obra não Informada");
    } catch (msg) {
      res.status(400).send(msg);
    }

    if (capitulo.id) {
      app
        .db("capitulos")
        .update(capitulo)
        .where({ id: capitulo.id })
        .then((_) => res.status(204).send())
        .catch((err) => res.status(500).send(err));
    } else {
      app
        .db("capitulos")
        .insert(capitulo)
        .then((_) => res.status(240).send())
        .catch((err) => res.status(500).send());
    }
  };

  const getUltimoCapitulo = (req, res) => {
    app
      .db("obras")
      .leftJoin("capitulos", "obras.id", "capitulos.obraId")
      .select(
        app.db.raw(
          "obras.id, case when max(capitulos.numero) is null then 0 else max(capitulos.numero) end as numero"
        )
      )
      .where({
        "obras.id": req.params.obraId,
      })
      .then((capitulos) => res.json(capitulos))
      .catch((err) => res.status(500).send(err));
  };

  const upload = (req, res) => {
    app
      .db("imagemObras")
      .insert({
        name: req.file.originalname,
        size: req.file.size,
        path: req.file.path,
        key: req.file.filename,
        obraId: req.params.id,
      })
      .then((_) => res.status(204).send())
      .catch((err) => res.status(500).send(err));
  };

  return {
    getObrasPublicas,
    getObrasPrivadas,
    save,
    getById,
    getObrasByCategoria,
    getUltimaObra,
    saveCapitulo,
    getUltimoCapitulo,
    upload,
    getCoautor,
  };
};
