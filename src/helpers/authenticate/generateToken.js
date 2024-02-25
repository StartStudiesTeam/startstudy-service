const jwt = require("jsonwebtoken");
const { jwtSecret, jwtExpires } = require("../../../config/env.config");

const generateToken = async (user) => {
  const token = await jwt.sign({ sub: user.id }, jwtSecret, {
    expiresIn: jwtExpires,
  });

  return token;
};

module.exports = {
  generateToken,
};
