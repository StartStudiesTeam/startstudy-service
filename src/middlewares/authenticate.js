const jwt = require("jsonwebtoken");
const UserMessageErrors = require("../constants/Users/errors");

const authenticationUser = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res
      .status(401)
      .json({ message: UserMessageErrors.unauthorizedUserError, body: {} });
  }

  const token = authorization.split(" ")[1];

  try {
    const { sub } = jwt.verify(token, process.env.JWT_SECRET);

    req.user = { id: sub };

    next();
  } catch (error) {
    return res
      .status(401)
      .json({ message: UserMessageErrors.unauthorizedUserError, body: {} });
  }
};

module.exports = { authenticationUser };
