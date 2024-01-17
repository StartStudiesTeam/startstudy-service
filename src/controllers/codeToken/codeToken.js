const errorMessages = require("../../helpers/codeMessages/errorMessages");
const currentTime = require("../../helpers/helpersData/data");
const {
  validationTokenDatabaseQuery,
} = require("../../helpers/users/helpersUsers");

const validationTokenQuery = async (req, res) => {
  const { email, codeToken } = req.body;

  currentTime.setHours(currentTime.getHours() - 1);

  try {
    const tokenQuery = await validationTokenDatabaseQuery(email, codeToken);

    if (!tokenQuery) {
      return res.status(404).json({ message: errorMessages.invalidToken });
    }

    if (tokenQuery.created_at < currentTime) {
      return res.status(404).json({ message: errorMessages.tokenExpired });
    }

    const token = jwt.sign({ sub: tokenQuery.id }, process.env.SECRET_KEY, {
      expiresIn: 60 * 10,
    });

    const { password: _, ...userValid } = tokenQuery;

    return res.status(200).json({ token });
  } catch (error) {
    return res.status(500).json({ message: errorMessages.InternalServerError });
  }
};

module.exports = validationTokenQuery;
