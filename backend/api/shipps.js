module.exports = app => {

    const getShipp = (req, res) => {
        app.db('shipp')

            .then(shipp => res.json(shipp))
            .catch(err => res.status(500).send())
    }

    return { getShipp }
}