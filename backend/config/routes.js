const multer = require('multer')
const multerConfig = require('./multer')
const autor = require('./autor')

module.exports = (app) => {
    app.post('/signin', app.api.auth.signin)
    app.post('/validateToken', app.api.auth.validateToken)

    app.route('/usuarios').post(app.api.usuario.save).get(app.api.usuario.get)
    app.route('/categorias').get(app.api.categorias.getCategoria)
    app.route('/universos').get(app.api.universo.getUniverso)
    app.route('/modalidades').get(app.api.modalidades.getModalidade)
    app.route('/avisos').get(app.api.avisos.getAvisos)
    app.route('/caracteristicas').get(
        app.api.caracteristicas.getCaracteristicas
    )

    app.route('/prateleiras').get(app.api.prateleiras.get)

    //**************************************Usuario*****************************************************

    app.route('/usuario/:id').get(app.api.usuario.getById)
    app.route('/usuario/:user/user').get(app.api.usuario.getUser)
    app.route('/usuario/:email/email').get(app.api.usuario.getEmail)
    app.route('/usuario/:id').put(app.api.usuario.updateUsuario)
    app.route('/usuario/:id/changepassword').put(app.api.usuario.updatePassword)
    app.route('/forgotPassword').put(app.api.auth.forgotPassword)
    app.route('/resendToken/:token')
        .put(app.api.auth.resendToken)
        .get(app.api.auth.getUserByTokenActived)
    app.route('/activeRegister/:token').put(app.api.auth.activeRegister)
    app.route('/usuario/:token/resetPassword').put(app.api.auth.resetPassword)
    app.route('/token/:token/').get(app.api.usuario.getUserByToken)

    app.post(
        '/perfil/:usuarioId/upload',
        multer(multerConfig).single('file'),
        app.api.usuario.uploadPerfil
    )
    app.post(
        '/banner/:usuarioId/upload',
        multer(multerConfig).single('file'),
        app.api.usuario.uploadBanner
    )

    //**************************************Estante*****************************************************
    app.route('/estante/:usuarioId').get(app.api.estante.get)
    app.route('/:user/estante/prateleira/:prateleiraId').get(
        app.api.estante.getById
    )
    app.route('/:id/estante/:obraId').get(app.api.estante.getEstanteByObraId)
    // app.route("/:user/estanteUniverso").get(app.api.estante.getuniversosByEstante)
    app.get('/estante/:user/universos', app.api.estante.getuniversosByEstante)
    app.route('/:user/estante/').post(app.api.estante.save)
    app.route('/estante/:id').put(app.api.estante.updateEstante)
    app.route('/estante/:usuarioId/prateleiras').get(
        app.api.estante.getEstantePrateleira
    )
    app.route('/:usuarioId/estante/:id')
        .delete(app.api.estante.removeEstante)
        .put(app.api.estante.arquivarObra)

    //**************************************Obras*****************************************************
    app.route('/obra/:obraId/capitulo/:numero')
        .get(app.api.obras.getByIdCapitulo)
        .post(app.api.obras.saveComentario)

    app.route('/obra/:obraId').get(app.api.obras.getByObraId)
    app.route('/obra/:obraId/capitulos').get(app.api.obras.getCapitulosByObra)
    app.route('/obra/:obraId/universos').get(app.api.obras.getUniversosByObra)
    app.route('/obra/:obraId/categorias').get(app.api.obras.getCategoriasByObra)
    app.route('/obra/:obraId/avisos').get(app.api.obras.getAvisosByObra)
    app.route('/obra/:obraId/capitulo/:numero/avisos').get(
        app.api.obras.getAvisosByCapitulo
    )
    app.route('/obra/:obraId/caracteristicas').get(
        app.api.obras.getCaracteristicasByObra
    )

    app.route('/obra/:obraId/capitulo/:numero/comentarios').get(
        app.api.obras.getComentarios
    )

    app.route('/obra/:obraId/capitulo/:numero/comentario/:comentarioId')
        .get(app.api.obras.getComentariosNew)
        .post(app.api.obras.saveResposta)

    //**************************************Perfil*****************************************************

    app.route('/perfil/:user').put(app.api.perfil.updateUser)

    app.route('/perfil/:user')
        // .all(app.config.passport.authenticate())
        .post(app.api.perfil.savePerfil)
        .get(app.api.perfil.getPerfil)

    app.route('/perfil/:user/estante').get(app.api.perfil.getEstantePerfil)

    app.route('/perfil/:user/sugestoes').get(app.api.perfil.getSugestoesPerfil)

    app.route('/perfil/:user/obras').get(app.api.perfil.getObrasPerfil)
    app.route('/perfil/:user/seguindo').get(app.api.perfil.getSeguindoPerfil)
    app.route('/perfil/:user/seguindo/total').get(
        app.api.perfil.getCountSeguindo
    )
    app.route('/perfil/:user/seguidores').get(
        app.api.perfil.getSeguidoresPerfil
    )
    app.route('/perfil/:user/seguidores/total').get(
        app.api.perfil.getCountSeguidores
    )
    app.route('/perfil/:usuarioId/conexao/:user').get(
        app.api.perfil.getConexaoByUser
    )

    app.route('/perfil/:autor/obras/shipp').get(
        app.api.perfil.getObrasPerfilShipp
    )

    //**************************************Mesa - Obra*****************************************************

    app.route('/mesa/:usuarioId/adicionarobra').post(app.api.mesa.save)
    app.route('/mesa/:obraId/editarobra').put(app.api.mesa.save)
    app.route('/mesa/:obraId/avisos').get(app.api.mesa.getAvisosByObra)
    app.route('/mesa/:obraId/semimagem').post(app.api.mesa.uploadSemImagem)

    app.post(
        '/mesa/:obraId/upload',
        multer(multerConfig).single('file'),
        app.api.mesa.uploadObra
    )

    app.route('/:usuarioId/mesa/:obraId')
        .all(app.config.passport.authenticate())

        .get(autor(app.api.mesa.getByIdUser))
        .delete(app.api.mesa.remove)
    app.route('/mesa/:obraId/capitulo/:numero').get(app.api.mesa.capituloById)
    app.route('/mesa/Coautor').get(app.api.mesa.getCoautor)
    app.route('/mesa/:id').get(app.api.mesa.getById)

    app.route('/mesa/:usuarioId/obraspublicas').get(
        app.api.mesa.getObrasPublicas
    )

    app.route('/mesa/:usuarioId/obraspublicas/status').get(
        app.api.mesa.getObraPublicasStatus
    )
    app.route('/mesa/:usuarioId/obrasprivadas/status').get(
        app.api.mesa.getObraPrivadasStatus
    )

    app.route('/mesa/:usuarioId/obrasprivadas').get(
        app.api.mesa.getObrasPrivadas
    )

    app.route('/obrasTeste/:fandonsId').get(app.api.mesa.getObrasByCategoria)

    app.route('/mesa/:id/ultimaobra/:obraNome').get(app.api.mesa.getUltimaObra)

    //**************************************Mesa - Capitulo*****************************************************

    app.route('/mesa/:obraId/adicionarcapitulo').post(app.api.mesa.saveCapitulo)
    app.route('/mesa/:obraId/editarcapitulo/:id').put(app.api.mesa.saveCapitulo)
    app.route('/mesa/:obraId/ultimocapitulo').get(
        app.api.mesa.getUltimoCapitulo
    )
    app.route('/mesa/:obraId/listacapitulos').get(app.api.mesa.listaCapitulos)
    app.route('/views/').post(app.api.mesa.contadorViews)

    //Minha Mesa - Notas

    app.route('/:user/notas')
        .post(app.api.notas.save)
        .get(app.api.notas.getByUser)

    app.route('/:usuarioId/mesa/notas/:id')
        .put(app.api.notas.save)
        .get(app.api.notas.getById)
        .delete(app.api.notas.remove)

    //***************************************Shipp**********************************************************

    app.route('/shipp').get(app.api.shipps.getShipp).post(app.api.shipps.save)

    //**************************************notificacoes*****************************************************
    app.route('/notificacoes/:obraId/capitulo/:capituloId/atualizacao').post(
        app.api.notificacoes.atualizacao
    )

    app.route('/notificacoes/:usuarioId/atualizacao').get(
        app.api.notificacoes.getAtulizacao
    )

    app.route('/notificacoes/:obraId/comentario').post(
        app.api.notificacoes.comentario
    )

    //*************************************Mensagens***********************************************************

    app.route('/mensagens/:usuarioId')
        .post(app.api.mensagens.saveMessage)
        .put(app.api.mensagens.updateFavorite)
    app.route('/mensagens/:usuarioId/enviadas').get(
        app.api.mensagens.getMensagensEnviadas
    )
    app.route('/mensagens/:usuarioId/recebidas').get(
        app.api.mensagens.getMensagensRecebidas
    )
    app.route('/mensagens/:usuarioId/read/:messageId')
        .get(app.api.mensagens.getMessageById)
        .put(app.api.mensagens.updateRead)
}
