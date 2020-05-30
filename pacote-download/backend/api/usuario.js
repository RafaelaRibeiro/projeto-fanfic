const bcrypt = require('bcrypt-nodejs')

module.exports = app => {
    const { existsOrError, notExistsOrError, equalsOrError } = app.api.validacao

    const encryptPassword = senha => {
        const salt = bcrypt.genSaltSync(10)
        return bcrypt.hashSync(senha, salt)
    }

    const save = async (req, res) => {
        const usuario = { ...req.body }
        if (req.params.id) usuario.id = req.params.id

        // if(!req.originalUrl.startsWith('/usuarios'))  usuario.perfil = false
        // if(!req.usuario || !req.usuario.perfil) usuario.perfil = false

        try {
            existsOrError(usuario.nome, 'Nome não informado')
            existsOrError(usuario.email, 'E-mail não informado')
            existsOrError(usuario.senha, 'Senha não informada')
            existsOrError(usuario.confirmarSenha, 'Necessário confirmar a senha')
            equalsOrError(usuario.senha, usuario.confirmarSenha, 'Senhas não conferem')

            const userFromDB = await app.db('usuarios')
                .where({ email: usuario.email }).first()
            if (!usuario.id) {
                notExistsOrError(userFromDB, 'Usuário já foi cadastrado')
            }
        } catch (msg) {
            return res.status(400).send(msg)
        }

        usuario.senha = encryptPassword(usuario.senha)
        delete usuario.confirmarSenha

        if (usuario.id) {
            app.db('usuarios')
                .update(usuario)
                .where({ id: usuario.id })
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else {
            app.db('usuarios')
                .insert(usuario)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
    }

    const get = (req, res) => {
        app.db('usuarios')
            .select('id', 'nome', 'email', 'perfil', 'autor')
            .then(usuarios => res.json(usuarios))
            .catch(err => res.status(500).send(err))
    }

    const getById = (req, res) => {
        app.db('usuarios')
            .select('id', 'nome', 'email', 'user', 'perfil', 'autor', 'sobreMim', 'facebook')
            .where({ id: req.params.id })
            .first()
            .then(usuario => res.json(usuario))
            .catch(err => res.status(500).send(err))
    }




    return { save, get, getById }
}