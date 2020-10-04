module.exports = app => {

    const getCategoria = (req,res) => {
        app.db('categorias')
            .then(categoria => res.json(categoria))
            .catch(err => res.status(500). send())
    }

    return { getCategoria}
}