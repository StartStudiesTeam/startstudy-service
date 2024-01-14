const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
  nickUserQuery,
  mailUserQuery,
} = require("../../helpers/users/helpersUsers.js");
const errorMessages = require("../../helpers/codeMessages/errorMessages");

const loginUser = async (req, res) => {
  const { nick_name, email, password } = req.body;
  try {
    if (email) {
      const existingUser = await mailUserQuery(email);

      if (!existingUser) {
        return res.status(404).json({
          message: errorMessages.invalidEmailOrPassword,
        });
      }

      const correctPass = await bcrypt.compare(password, existingUser.password);

      if (!correctPass) {
        return res.status(404).json({
          message: errorMessages.invalidEmailOrPassword,
        });
      }

      const token = jwt.sign({ sub: existingUser.id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
      });

      const { password: _, ...userValid } = existingUser;

      return res.status(200).json({ token });
    }
    if (nick_name) {
      const existingNick = await nickUserQuery(nick_name);

      if (!existingNick) {
        return res.status(404).json({
          message: errorMessages.invalidNickNameOrPassword,
        });
      }

      const correctPass = await bcrypt.compare(password, existingNick.password);

      if (!correctPass) {
        return res.status(404).json({
          message: errorMessages.invalidNickNameOrPassword,
        });
      }

      const token = jwt.sign({ sub: existingNick.id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
      });

      const { password: _, ...userValid } = existingNick;

      return res.status(200).json({ token });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: errorMessages.InternalServerError, error: message });
  }
};

module.exports = loginUser;
