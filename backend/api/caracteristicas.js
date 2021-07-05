module.exports = (app) => {
  const getCaracteristicas = (req, res) => {
    app
      .db("caracteristicas")
      .orderBy("nome", "asc")
      .then((caracteristica) => res.json(caracteristica))
      .catch((err) => res.status(500).send());
  };

  return { getCaracteristicas };
};
