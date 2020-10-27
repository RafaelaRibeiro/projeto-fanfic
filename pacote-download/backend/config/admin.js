module.exports = (middleware) => {
  return (req, res, next) => {
    if (req.user.id == req.params.usuarioId) {
      middleware(req, res, next);
    } else {
      res.status(403).send("Você não tem permissão");
    }
  };
};
