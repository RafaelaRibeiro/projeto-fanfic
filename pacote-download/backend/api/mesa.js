const aws = require("aws-sdk");
const s3 = new aws.S3();

module.exports = (app) => {
  const { existsOrError, notExistsOrError } = app.api.validacao;
  //************************************************** */  Obras**********************************************************
  const save = async (req, res) => {
    const obra = { ...req.body };
    if (req.params.obraId) obra.id = req.params.obraId;

    try {
      existsOrError(obra.nome, "Título não informado");
      existsOrError(obra.categoriaId, "Categoria não Informada");
      existsOrError(obra.classificacao, "Classificação não informada");
      existsOrError(obra.sinopse), "Sinopse não Informada";
    } catch (msg) {
      res.status(400).send(msg);
    }

    if (obra.id) {
      await app
        .db("obras")
        .update(obra)
        .where({ id: obra.id })
        .then((_) => res.status(204).send())
        .catch((err) => res.status(500).send(err));
    } else {
      await app
        .db("obras")
        .insert(obra)
        .then((_) => res.status(204).send())
        .catch((err) => res.status(500).send(err));
    }


  };

  const getById = (req, res) => {
    app
      .db("obras")
      .select("obras.*")
      .where({ "obras.id": req.params.id })
      .first()
      .then((obra) => res.json(obra))
      .catch((err) => res.status(500).send(err));
  };

  const getByIdUser = async (req, res) => {
    const autor = await app
      .db("obras")
      .select("obras.autor")
      .where({ id: req.params.id })
      .first();

    if (autor.autor !== parseInt(req.params.usuarioId))
      return res.status(403).send("Você não tem permissão");

    app
      .db("obras")
      .leftJoin("imagensObra", "obras.id", "imagensObra.obraId")
      .select(
        "obras.*",
        app.db.raw(
          "ifnull(imagensObra.name,'') as name,ifnull(imagensObra.size,0) as size,imagensObra.path,imagensObra.key,imagensObra.obraId"
        )
      )
      .where({ "obras.id": req.params.id })
      .first()
      .then((obra) => res.json(obra))
      .catch((err) => res.status(500).send(err));


  };

  //  ***********************************************************Capitulos**********************************************************************

  const contadorViews = async (res, req) => {


    let cont = await app
      .db("contador")
      .where({ "contador.obraId": req.params.obraId, capituloId: req.params.capituloId, usuarioId: req.params.usuarioId })
      .first();

    console.log('passou')

    if (cont.id) {
      app.db("contador")
        .update({ views: cont.views + 1 })
        .where({ id: cont.id })
        .then((_) => res.status(204).send())
        .catch((err) => res.status(500).send(err))
    } else {
      app.db("contador")
        .insert({
          views: 1,
          obraId: req.params.obraId,
          capituloId: req.params.capituloId,
          usuarioId: req.params.usuarioId
        })
        .then((_) => res.status(204).send())
        .catch((err) => res.status(500).send(err))
    }




  }


  const capituloById = (req, res) => {
    app
      .db("capitulos")

      .select(
        "capitulos.*",
        app.db.raw("CONVERT(capitulos.conteudo USING utf8) as conteudo")
      )
      .where({
        "capitulos.obraId": req.params.obraId,
        "capitulos.numero": req.params.numero,
      })
      .first()
      .then((capitulos) => res.json(capitulos))
      .catch((err) => res.status(500).send(err));
  };

  const listaCapitulos = (req, res) => {
    app
      .db("capitulos")
      .join("obras", "capitulos.obraId", "obras.id")
      .select(
        "capitulos.obraId",
        "obras.nome as nomeObra",
        "capitulos.id",
        "capitulos.nome",
        "capitulos.dataPostagem",
        "capitulos.numero",
        "capitulos.publica",
        app.db.raw(
          "date_format(capitulos.dataPostagem, '%d/%m/%Y %H:%i:%s') as dataPostagem"
        )
      )
      .where({ "capitulos.obraId": req.params.obraId })
      .then((capitulos) => res.json(capitulos))
      .catch((err) => res.status(500).send(err));
  };

  const getCoautor = (req, res) => {
    app
      .db("usuarios")
      .select("id", "user")

      .orderBy("user", "asc")
      .then((user) => res.json(user))
      .catch((err) => res.status(500).send());
  };

  const getUltimaObra = (req, res) => {
    const query = app
      .db("obras")
      .join("usuarios", "obras.autor", "=", "usuarios.id")
      .where({ "usuarios.id": req.params.id })
      .max("obras.id");
    app
      .db("obras")
      .join("usuarios", "obras.autor", "=", "usuarios.id")
      .select("obras.*")
      .where({ "usuarios.id": req.params.id, "obras.id": query })

      .then((obras) => res.json(obras))
      .catch((err) => res.status(500).send(err));
  };
  const limit = 10; // usado para paginação

  const getObraPublicasStatus = (req, res) => {
    app.db("obras")
      .select({ id: "obras.terminada" }, app.db.raw("case terminada when 'A' then 'Em Andamento' when 'S' then 'Suspensa' when 'T' then 'Terminada' ELSE '' END as status"))
      .count({ count: "obras.terminada" })
      .groupBy("obras.terminada")
      .where({ autor: req.params.usuarioId, "obras.publica": true })
      .then((status) => res.json(status))
      .catch((err) => res.status(500).send(err));
  }

  const getObrasPublicas = (req, res) => {
    app
      .db("obras")
      .leftJoin("capitulos", "obras.id", "capitulos.obraId")
      .leftJoin("imagensObra", "obras.id", "imagensObra.obraId")
      .select(
        "obras.*",
        app.db.raw(
          "obras.id as obraId, COUNT(capitulos.id) as countCap, imagensObra.path, date_format(obras.dataAdicionado, '%d/%m/%Y %H:%i:%s') as dataAdicionado"
        )
      )

      .where({ autor: req.params.usuarioId, "obras.publica": true })
      .orderBy("obras.id", "desc")
      .groupBy("obras.id")
      .then((obras) => res.json(obras))
      .catch((err) => res.status(500).send(err));
  };

  const getObraPrivadasStatus = (req, res) => {
    app.db("obras")
      .select({ id: "obras.terminada" }, app.db.raw("case terminada when 'A' then 'Em Andamento' when 'S' then 'Suspensa' when 'T' then 'Terminada' ELSE '' END as status"))
      .count({ count: "obras.terminada" })
      .groupBy("obras.terminada")
      .where({ autor: req.params.usuarioId, "obras.publica": false })
      .then((status) => res.json(status))
      .catch((err) => res.status(500).send(err));
  }
  const getObrasPrivadas = (req, res) => {
    app
      .db("obras")
      .leftJoin("capitulos", "obras.id", "capitulos.obraId")
      .leftJoin("imagensObra", "obras.id", "imagensObra.obraId")
      .select(
        "obras.*",
        app.db.raw(
          "obras.id as obraId, COUNT(capitulos.id) as countCap, imagensObra.path, date_format(obras.dataAdicionado, '%d/%m/%Y %H:%i:%s') as dataAdicionado"
        )
      )

      .where({ autor: req.params.usuarioId, "obras.publica": false })
      .orderBy("obras.id", "desc")
      .groupBy("obras.id")
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
      .first()
      .then((capitulos) => res.json(capitulos))
      .catch((err) => res.status(500).send(err));
  };

  const uploadObra = async (req, res) => {
    const image = { ...req.body };
    if (req.params.obraId) image.obraId = req.params.obraId;

    var getImage = await app
      .db("imagensObra")
      .select("id", "key", "obraId")
      .where({ obraId: req.params.obraId })
      .first();

    console.log(getImage);
    console.log(req.file);

    if (getImage && getImage.key !== image.key) {
      await s3
        .deleteObject({
          Bucket: "upload.fanbase",
          Key: getImage.key,
        })
        .promise();
      app
        .db("imagensObra")
        .update({
          name: req.file.originalname,
          path: req.file.location,
          key: req.file.key,
        })
        .where({ id: getImage.id })
        .then((_) => res.status(204).send())
        .catch((err) => res.status(500).send(err));
    } else {
      app
        .db("imagensObra")
        .insert({
          name: req.file.originalname,
          size: req.file.size,
          path: req.file.location,
          key: req.file.key,
          obraId: req.params.obraId,
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
    capituloById,
    listaCapitulos,
    getByIdUser,
    getObraPublicasStatus,
    getObraPrivadasStatus,
    contadorViews

  };
};
