const errorMessages = require("../../helpers/codeMessages/errorMessages");
const { validTime } = require("../../helpers/helpersData/data");
const {
  validationCodeTokenDatabaseQuery,
} = require("../../helpers/users/helpersUsers");

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

    await knex("dateusers").update({ verify_mail: true }).where({ email });

    const token = jwt.sign({ sub: tokenQuery.id }, process.env.SECRET_KEY, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    const { password: _, ...userValid } = tokenQuery;

    return res.status(200).json({ token });
  } catch (error) {
    return res.status(500).json({ message: errorMessages.InternalServerError });
  }
};

module.exports = validationCodeTokenQuery;
