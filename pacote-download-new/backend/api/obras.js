module.exports = (app) => {
  const { existsOrError, notExistsOrError } = app.api.validacao;

  const saveComentario = (req, res) => {
    const comentario = { ...req.body };
    if (req.params.id) comentario.id = req.params.id;

    try {
      existsOrError(comentario.conteudo, "Comentário não informado");
    } catch (msg) {
      res.status(400).send(msg);
    }

    app
      .db("comentarios")
      .insert(comentario)
      .then((_) => res.status(204).send())
      .catch((err) => res.status(500).send(err));
  };
  const limit = 5; // usado para paginação
  const getComentarios = async (req, res) => {
    const page = req.query.page || 1;

    const result = await app
      .db("comentarios")
      .join("capitulos", "comentarios.capituloId", "capitulos.id")
      .count("comentarios.id", { as: "count" })
      .where({
        "comentarios.obraId": req.params.obraId,
        numero: req.params.numero,
      })
      .first();
    const count = parseInt(result.count);
    const totalPage = Math.ceil(count / limit);
    app
      .db("comentarios")
      .join("capitulos", "comentarios.capituloId", "capitulos.id")
      .join("usuarios", "comentarios.usuarioId", "usuarios.id")
      .select(
        app.db.raw(
          "comentarios.id, comentarios.usuarioId, usuarios.nome, usuarios.imagemPerfil, CONVERT(comentarios.conteudo USING utf8) as conteudo , date_format(dataComentario, '%d/%m/%Y %H:%i:%s')as dataComentario"
        )
      )
      .where({
        "comentarios.obraId": req.params.obraId,
        numero: req.params.numero,
      })
      .limit(limit)
      .offset(page * limit - limit)
      .orderBy("comentarios.id", "desc")
      .then((comentarios) =>
        res.json({ data: comentarios, count, limit, totalPage })
      )
      .catch((err) => res.status(500).send(err));
  };

  const getByIdCapitulo = (req, res) => {
    app
      .db("capitulos")
      .join("obras", "capitulos.obraId", "=", "obras.id")
      .select(
        app.db.raw(
          "obras.nome as obraNome, capitulos.id, CONVERT(capitulos.conteudo USING utf8) as conteudo, capitulos.numero, capitulos.nome, capitulos.notasIniciais, capitulos.notasFinais, capitulos.obraId, capitulos.avisosId"
        )
      )
      .where({ obraId: req.params.obraId, numero: req.params.numero })
      .first()
      .then((capitulo) => res.json(capitulo))
      .catch((err) => res.status(500).send(err));
  };

  const getByObraId = (req, res) => {
    app
      .db("obras")
      .join("usuarios", "obras.autor", "usuarios.id")
      .join("capitulos", "obras.id", "capitulos.obraId")
      .join("categorias", "obras.categoriaId", "categorias.id")
      .select(
        app.db.raw(
          "obras.id, obras.nome, obras.autor, categorias.nome as categoriaId, obras.classificacao, case obras.terminada when 0 then 'Em Andamento' else 'Terminada' end as status, obras.sinopse, date_format(dataAdicionado, '%d/%m/%Y %H:%i:%s') as dataAdicionado,  usuarios.user, max(date_format(dataPostagem, '%d/%m/%Y %H:%i:%s'))as ultimaPostagem"
        )
      )
      .where({ "obras.id": req.params.obraId, "obras.publica": true })
      .groupBy("obras.id")
      .then((obras) => res.json(obras))
      .catch((err) => res.status(500).send(err));
  };

  const getCapitulosByObra = (req, res) => {
    app
      .db("capitulos")
      .join("obras", "capitulos.obraId", "obras.id")
      .select(
        app.db.raw(
          "capitulos.numero, capitulos.nome, capitulos.obraId,  ROUND ((LENGTH(CONVERT(capitulos.conteudo USING utf8)) - LENGTH( REPLACE (CONVERT(capitulos.conteudo USING utf8), ' ','') ) ) / LENGTH(' ')) + 1 as contador"
        )
      )
      .where({ "obras.id": req.params.obraId, "obras.publica": true })
      .orderBy("capitulos.numero", "asc")
      .then((capitulo) => res.json(capitulo))
      .catch((err) => res.status(500).send(err));
  };

  const getUniversosByObra = (req, res) => {
    app
      .db("fandons")
      .join("obras", "fandons.categoriaId", "obras.categoriaId")
      .select("fandons.id", "fandons.nome")

      .whereRaw("FIND_IN_SET(fandons.id, obras.fandonsId)")
      .where({ "obras.id": req.params.obraId, "obras.publica": true })
      .orderBy("fandons.nome", "asc")
      .then((universo) => res.json(universo))
      .catch((err) => res.status(500).send(err));
  };

  const getAvisosByObra = (req, res) => {
    app
      .db("avisos")
      .join("obras")
      .select(app.db.raw("GROUP_CONCAT(avisos.nome SEPARATOR ', ') as nome"))
      .whereRaw("FIND_IN_SET(avisos.id, obras.avisosId)")
      .where({ "obras.id": req.params.obraId, "obras.publica": true })
      .orderBy("avisos.nome", "asc")
      .then((aviso) => res.json(aviso))
      .catch((err) => res.status(500).send(err));
  };

  const getAvisosByCapitulo = (req, res) => {
    app
      .db("avisos")
      .join("capitulos")
      .select(app.db.raw("GROUP_CONCAT(avisos.nome SEPARATOR ', ') as nome"))
      .whereRaw("FIND_IN_SET(avisos.id, capitulos.avisosId)")
      .where({
        "capitulos.obraId": req.params.obraId,
        "capitulos.numero": req.params.numero,
      })
      .orderBy("avisos.nome", "asc")
      .then((aviso) => res.json(aviso))
      .catch((err) => res.status(500).send(err));
  };
  const getCaracteristicasByObra = (req, res) => {
    app
      .db("caracteristicas")
      .join("obras")
      .select(
        app.db.raw("GROUP_CONCAT(caracteristicas.nome SEPARATOR ', ') as nome")
      )
      .whereRaw("FIND_IN_SET(caracteristicas.id, obras.caracteristicasId)")
      .where({ "obras.id": req.params.obraId, "obras.publica": true })
      .orderBy("caracteristicas.nome", "asc")
      .then((caracteristica) => res.json(caracteristica))
      .catch((err) => res.status(500).send(err));
  };
  return {
    getByIdCapitulo,
    saveComentario,
    getComentarios,
    getByObraId,
    getCapitulosByObra,
    getUniversosByObra,
    getAvisosByObra,
    getCaracteristicasByObra,
    getAvisosByCapitulo,
  };
};
