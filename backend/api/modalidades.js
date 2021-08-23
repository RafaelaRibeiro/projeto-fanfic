module.exports = (app) => {
    const getModalidade = (req, res) => {
        app.db("modalidades")
            .then((modalidade) => res.json(modalidade))
            .catch((err) => res.status(500).send())
    }

    return { getModalidade }
}
