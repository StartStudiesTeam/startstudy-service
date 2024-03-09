const jwt = require("jsonwebtoken");
const errorMessages = require("../constants/codeMessages/errorMessages");

const authenticationUser = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ message: errorMessages.unauthorizedUser });
  }

  const token = authorization.split(" ")[1];

  try {
    const { sub } = jwt.verify(token, process.env.JWT_SECRET);

    req.user = { id: sub };

    next();
  } catch (error) {
    return res.status(401).json({ message: errorMessages.unauthorizedUser });
  }
};

module.exports = { authenticationUser };
