const autor = require('../config/autor')

module.exports = (app) => {
    const { existsOrError, notExistsOrError } = app.api.validacao
    const atualizacao = async (req, res) => {
        const atualizacao = { ...req.body }

        try {
            existsOrError(atualizacao.obraId, 'Obra não informada')
            existsOrError(atualizacao.capituloId, 'Capitulo não informado')

            const usuarioId = await app
                .db('estante')
                .join('obras', 'estante.obraId', 'obras.id')
                .join('capitulos', 'obras.id', 'capitulos.obraId ')
                .select('usuarioId', {
                    eventoId: 2,
                    obraId: req.body.obraId,
                    capituloId: req.body.capituloId,
                })
                .where({
                    'estante.obraId': req.params.obraId,
                    'capitulos.id': req.params.capituloId,
                    'estante.prateleiraId': 1,
                })
                .whereNotExists(
                    app.db
                        .select(1)
                        .from('notificacoes')
                        .whereRaw(
                            'estante.usuarioId = notificacoes.usuarioId and estante.obraId = notificacoes.obraId and capitulos.id = notificacoes.capituloId and notificacoes.eventoId = 2'
                        )
                )
                .groupBy('usuarioId')

            app.db
                .batchInsert('notificacoes', usuarioId)
                .then((_) => res.status(204).send())
                .catch((err) => res.status(500).send(err))
        } catch (msg) {
            res.status(400).send(msg)
        }
    }

    const comentario = async (req, res) => {
        const usuarioId = await app
            .db('obras')
            .select({
                usuarioId: 'obras.autor',
                eventoId: 1,
                obraId: req.body.obraId,
                capituloId: req.body.capituloId,
                comentarioId: req.body.comentarioId,
                conexaoId: req.body.conexaoId,
            })
            .where({ id: req.params.obraId })

        app.db
            .batchInsert('notificacoes', usuarioId)
            .then((_) => res.status(204).send())
            .catch((err) => res.status(500).send(err))
    }

    const getAtulizacao = (req, res) => {
        app.db('notificacoes')
            .select(
                'notificacoes.id',
                'notificacoes.usuarioId',
                'notificacoes.obraId',
                'notificacoes.capituloId'
            )
            .where({ eventoId: 2, usuarioId: req.params.usuarioId })
            .then((atualizacao) => res.json(atualizacao))
            .catch((err) => res.status(500).send(err))
    }

    return {
        atualizacao,
        comentario,
        getAtulizacao,
    }
}
