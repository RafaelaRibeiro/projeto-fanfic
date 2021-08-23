module.exports = (app) => {
    const { existsOrError } = app.api.validacao

    const saveMessage = (req, res) => {
        const message = { ...req.body }
        if (req.params.id) message.id = req.params.id

        try {
            existsOrError(message.fromUsuarioId, 'Remetente não informado')
            existsOrError(message.toUsuarioId, 'Nenhum destinatário informado')
            existsOrError(message.assunto, 'Mensagem sem assunto')
            existsOrError(message.conteudo, 'Mensagem sem conteúdo')

            app.db('mensagens')
                .insert(message)
                .then((_) => res.status(204).send())
                .catch((err) => res.status(500).send(err))
        } catch (msg) {
            res.status(400).send(msg)
        }
    }

    const updateFavorite = async (req, res) => {
        const message = { ...req.body }

        const messageId = await app
            .db('mensagens')
            .where({ 'mensagens.id': message.id })
            .first()

        if (!messageId) return res.status(400).send('Mensagem não encontrada')

        app.db('mensagens')
            .update({ favoritos: message.favoritos })
            .where({ id: message.id })
            .then((_) => res.status(204).send())
            .catch((err) => res.status(500).send(err))
    }

    const updateRead = async (req, res) => {
        const now = new Date()

        const messageId = await app
            .db('mensagens')
            .where({ 'mensagens.id': req.params.messageId })
            .first()

        if (messageId.readAt === null && req.body.notRead === false) {
            app.db('mensagens')
                .update({ readAt: now })
                .where({ id: req.params.messageId })
                .then((_) => res.status(204).send())
                .catch((err) => res.status(500).send(err))
        } else if (req.body.notRead === true) {
            app.db('mensagens')
                .update({ readAt: null })
                .where({ id: req.params.messageId })
                .then((_) => res.status(204).send())
                .catch((err) => res.status(500).send(err))
        } else {
            app.db('mensagens')
                .update({ readAt: messageId.readAt })
                .where({ id: req.params.messageId })
                .then((_) => res.status(204).send())
                .catch((err) => res.status(500).send(err))
        }
    }

    const getMensagensEnviadas = (req, res) => {
        app.db('mensagens')
            .join('usuarios', 'toUsuarioId', 'usuarios.id')
            .select(
                'mensagens.id',
                'usuarios.nome',
                'mensagens.assunto',
                'mensagens.favoritos',

                app.db.raw(
                    "CONVERT(mensagens.conteudo USING utf8) as conteudo, (CASE WHEN DATE_FORMAT(CURDATE(),'%d/%m/%Y')= DATE_FORMAT(createAt,'%d/%m/%Y') THEN DATE_FORMAT(createAt, '%H:%i') ELSE DATE_FORMAT(createAt,'%d/%m/%Y') END) as createAt, mensagens.createAt as dtCreateAt, mensagens.readAt"
                )
            )
            .where({ fromUsuarioId: req.params.usuarioId })
            .orderBy(4, 'desc')
            .then((mensagens) => res.json(mensagens))
            .catch((err) => res.status(500).send(err))
    }

    const getMensagensRecebidas = (req, res) => {
        app.db('mensagens')
            .join('usuarios', 'fromUsuarioId', 'usuarios.id')
            .select(
                'mensagens.id',
                'usuarios.nome',
                'mensagens.assunto',
                'mensagens.favoritos',

                app.db.raw(
                    "CONVERT(mensagens.conteudo USING utf8) as conteudo,(CASE WHEN DATE_FORMAT(CURDATE(),'%d/%m/%Y')= DATE_FORMAT(createAt,'%d/%m/%Y') THEN DATE_FORMAT(mensagens.createAt, '%H:%i') ELSE DATE_FORMAT(mensagens.createAt,'%d/%m/%Y') END) as createAt, mensagens.createAt as dtCreateAt,mensagens.readAt"
                )
            )
            .where({ toUsuarioId: req.params.usuarioId })
            .orderBy(4, 'desc')
            .then((mensagens) => res.json(mensagens))
            .catch((err) => res.status(500).send(err))
    }

    const getMessageById = (req, res) => {
        app.db('mensagens')
            .join('usuarios', 'fromUsuarioId', 'usuarios.id')
            .join({ to: 'usuarios' }, 'toUsuarioId', 'to.id')
            .join('imagensPerfil', 'fromUsuarioId', 'imagensPerfil.usuarioId')
            .select(
                'mensagens.id',
                'usuarios.nome',
                { fromId: 'usuarios.id' },
                { toId: 'to.id' },
                { toNome: 'to.nome' },

                'mensagens.assunto',
                'mensagens.favoritos',
                app.db.raw(
                    "CONVERT(mensagens.conteudo USING utf8) as conteudo,(CASE WHEN DATE_FORMAT(CURDATE(),'%d/%m/%Y')= DATE_FORMAT(createAt,'%d/%m/%Y') THEN DATE_FORMAT(mensagens.createAt, '%H:%i') ELSE DATE_FORMAT(mensagens.createAt,'%d/%m/%Y') END) as createAt, date_format(mensagens.createAt, '%d/%m/%Y %H:%i:%s') as dtCreateAt,mensagens.readAt"
                ),
                'imagensPerfil.path'
            )
            .where({ 'mensagens.id': req.params.messageId })
            .first()
            .then((mensagens) => res.json(mensagens))
            .catch((err) => res.status(500).send(err))
    }

    return {
        saveMessage,
        getMensagensEnviadas,
        getMensagensRecebidas,
        getMessageById,
        updateFavorite,
        updateRead,
    }
}
