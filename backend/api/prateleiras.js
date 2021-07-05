

module.exports = app => {
    
    const get = (req, res) => {
        app.db('prateleiras')
           
            .then(prateleiras => res.json(prateleiras))
            .catch(err => res.status(500).send(err))
    }



    return { get }
}