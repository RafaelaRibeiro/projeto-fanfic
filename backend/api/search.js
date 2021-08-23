module.exports = (app) => {
    const searchObras = (req, res) => {
        app.db("obras")

            .then((obra) => res.json(obra))
            .catch((err) => res.status(500).send(err))
    }

    return { searchObras }
}
