module.exports = (app) => {
    const searchObras = (req, res) => {
        app.db("obras")
            .join("usuarios", "obras.autor", "usuarios.id")
            .join("modalidades", "obras.modalidadeId", "modalidades.id")
            .leftJoin("capitulos", "obras.id", "capitulos.obraId")
            .join("prateleiras", "obras.prateleiraId", "prateleiras.id")
            .leftJoin("imagensObra", "obras.id", "imagensObra.obraId")
            .leftJoin("contador", "obras.id", "contador.obraId")

            .select(
                app.db.raw(
                    "obras.id, obras.nome, obras.autor, usuarios.nome as autor, obras.modalidadeId, modalidades.nome as modalidade, obras.classificacao, obras.categoriaId, obras.fandonsId, prateleiras.nome as status, obras.sinopse, date_format(dataAdicionado, '%d/%m/%Y %H:%i:%s') as dataAdicionado,  usuarios.user,max(date_format(dataPostagem, '%d/%m/%Y %H:%i:%s')) as ultimaPostagem,imagensObra.path,  COUNT(DISTINCT contador.id) as views, obras.linkTwitter"
                )
            )
            .whereRaw("(capitulos.id IS NOT NULL OR obras.modalidadeId = 4) ")
            .whereRaw(
                `categoriaId REGEXP REPLACE('${req.body.categorias}',',','|')`
            )
            .andWhere("obras.nome", "like", "%" + req.body.nome + "%")
            .andWhere("usuarios.nome", "like", "%" + req.body.autor + "%")

            .groupBy("obras.id")

            .then((obras) => res.json(obras))
            .catch((err) => res.status(500).send(err));
    };

    return { searchObras };
};
