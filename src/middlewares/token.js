const knex = require("../database/connection");
const jwt = require("jsonwebtoken");

const authenticationUser = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ mensagem: "Não autorizado" });
  }

  const token = authorization.split(" ")[1];

  try {
    const { sub } = jwt.verify(token, process.env.SECRET_KEY);

    req.user = { id: sub };

    next();
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

module.exports = { authenticationUser };
