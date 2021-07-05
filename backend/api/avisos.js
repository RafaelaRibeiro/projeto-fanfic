module.exports = (app) => {
  const getAvisos = (req, res) => {
    app
      .db("avisos")
      .orderBy("nome", "asc")
      .then((aviso) => res.json(aviso))
      .catch((err) => res.status(500).send());
  };

  return { getAvisos };
};
