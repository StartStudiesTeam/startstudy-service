const knex = require("../../database/connection");
const { mailUserQuery } = require("../../helpers/users/helpersUsers");
const errorMessages = require("../../helpers/codeMessages/errorMessages");

const queryValidationToken = async (req, res) => {
  const { email, codeToken } = req.body;

  const currentTime = new Date();
  currentTime.setHours(currentTime.getHours() - 1);

  try {
    const user = await mailUserQuery(email);

    const queryToken = await knex("dateusers")
      .innerJoin(
        "token_confirmation",
        "dateusers.id",
        "=",
        "token_confirmation.user_id"
      )
      .where({ email, code_token: codeToken });

    if (!queryToken[0]) {
      return res.status(404).json({ message: errorMessages.invalidToken });
    }

    if (queryToken[0].created_at < currentTime) {
      return res.status(404).json({ message: errorMessages.tokenExpired });
    }

    const token = jwt.sign({ sub: nick.id }, process.env.SECRET_KEY, {
      expiresIn: 60 * 10,
    });

    const { password: _, ...userValid } = nick;

    return res.status(200).json({ token });
  } catch (error) {
    return res
      .status(500)
      .json({ message: errorMessages.InternalServerError, error: message });
  }
};

module.exports = queryValidationToken;
