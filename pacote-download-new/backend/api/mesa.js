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
      .where({ "obras.id": req.params.id })
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
  const limit = 10; // usado para paginação
  const getObrasPublicas = async (req, res) => {
    const page = req.query.page || 1;

    const result = await app
      .db("obras")
      .join("usuarios", "obras.autor", "=", "usuarios.id")
      .count("obras.id", { as: "count" })
      .where({
        "usuarios.user": req.params.user,
        "obras.publica": true,
      })
      .first();
    const count = parseInt(result.count);
    const totalPage = Math.ceil(count / limit);
    app
      .db("obras")
      .join("usuarios", "obras.autor", "=", "usuarios.id")
      .leftJoin("capitulos", "obras.id", "capitulos.obraId")
      .leftJoin("imagemObras", "obras.id", "imagemObras.obraId")
      .select(
        app.db.raw(
          "obras.id as obraId,obras.nome,obras.publica,obras.categoriaId,obras.fandonsId,obras.shippPrincipal,obras.shippSecundario, obras.classificacao,   obras.terminada, date_format(dataAdicionado, '%d/%m/%Y %H:%i:%s')as dataAdicionado, imagemObras.key"
        )
      )
      .count("capitulos.id", { as: "countCap" })
      .where({ user: req.params.user, "obras.publica": true })
      .limit(limit)
      .offset(page * limit - limit)
      .groupBy("obras.id")
      .orderBy("obras.id", "desc")
      // .having('countCap', '>',0)
      .then((obras) => res.json({ data: obras, count, limit, totalPage }))
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

  const getAvisosByObra = (req, res) => {
    app
      .db("avisos")
      .join("obras")
      .select("avisos.*")
      .whereRaw("FIND_IN_SET(avisos.id, obras.avisosId)")
      .where({ "obras.id": req.params.obraId, "obras.publica": true })
      .orderBy("avisos.nome", "asc")
      .then((aviso) => res.json(aviso))
      .catch((err) => res.status(500).send(err));
  };

  const remove = async (req, res) => {
    const rowsUpdate = await app
      .db("obras")
      .update({ deletado: new Date(), terminada: "S" })
      .where({ id: req.params.id });
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
          "obras.id, case when max(capitulos.numero) is null then 0 else max(capitulos.numero) end as max_numero, case when min(capitulos.numero) is null then 0 else min(capitulos.numero) end as min_numero"
        )
      )
      .where({
        "obras.id": req.params.obraId,
      })
      .then((capitulos) => res.json(capitulos))
      .catch((err) => res.status(500).send(err));
  };

  // const upload = (req, res) => {
  //   app
  //     .db("imagemObras")
  //     .insert({
  //       name: req.file.originalname,
  //       size: req.file.size,
  //       path: req.file.location,
  //       key: req.file.key,
  //       obraId: req.params.id,
  //     })
  //     .then((_) => res.status(204).send())
  //     .catch((err) => res.status(500).send(err));
  // };

  const uploadObra = async (req, res) => {
    const image = { ...req.body };
    if (req.params.usuarioId) image.usuarioId = req.params.usuarioId;

    var getImage = await app
      .db("imagemObra")
      .select("id", "key", "usuarioId")
      .where({ usuarioId: req.params.usuarioId })
      .first();

    if (getImage) {
      await s3
      .deleteObject({
        Bucket: "upload.fanbase",
        Key: getImage.key,
      })
      .promise();
      app
        .db("imagemObra")
        .update({
          name: req.file.originalname,
          size: req.file.size,
          path: req.file.location,
          key: req.file.key,
        })
        .where({ usuarioId: getImage.usuarioId })
        .then((_) => res.status(204).send())
        .catch((err) => res.status(500).send(err));
    } else {
      app
      .db("imagemObra")
      .insert({
        name: req.file.originalname,
        size: req.file.size,
        path: req.file.location,
        key: req.file.key,
        usuarioId: req.params.usuarioId,
      })
      .then((_) => res.status(204).send())
      .catch((err) => res.status(500).send(err));
    }
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
    uploadObra,
    getCoautor,
    getAvisosByObra,
    remove,
  };
};
