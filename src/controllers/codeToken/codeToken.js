const errorMessages = require("../../helpers/codeMessages/errorMessages");
const { validTime } = require("../../helpers/helpersData/data");
const {
  validationCodeTokenDatabaseQuery,
  verifyEmailColumnUpdate,
} = require("../../helpers/users/helpersUsers");
const knex = require("../../database/connection");
const jwt = require("jsonwebtoken");

const validationCodeTokenQuery = async (req, res) => {
  const { email, codeToken } = req.body;

  try {
    const tokenQuery = await validationCodeTokenDatabaseQuery(email, codeToken);

    if (!tokenQuery) {
      return res.status(400).json({ message: errorMessages.invalidToken });
    }

    if (tokenQuery.created_at < validTime) {
      return res.status(403).json({ message: errorMessages.tokenExpired });
    }

    const emailUpdateQuery = await verifyEmailColumnUpdate(email);

    const token = jwt.sign({ sub: tokenQuery.id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    const { password: _, ...userValid } = tokenQuery;

    return res.status(200).json({ token });
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

module.exports = validationCodeTokenQuery;
