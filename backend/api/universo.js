module.exports = (app) => {
  const getUniverso = (req, res) => {
    app
      .db("fandons")
      .orderBy("nome")

      .then((universo) => res.json(universo))
      .catch((err) => res.status(500).send());
  };

  return { getUniverso };
};
