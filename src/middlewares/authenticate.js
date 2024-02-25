const jwt = require("jsonwebtoken");
const errorMessages = require("../helpers/codeMessages/errorMessages");
const { jwtSecret } = require("../../config/env.config");

const authenticationUser = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ message: errorMessages.unauthorizedUser });
  }

  const token = authorization.split(" ")[1];

  try {
    const { sub } = jwt.verify(token, jwtSecret);

    req.user = { id: sub };

    next();
  } catch (error) {
    return res.status(401).json({ message: errorMessages.unauthorizedUser });
  }
};

module.exports = { authenticationUser };
