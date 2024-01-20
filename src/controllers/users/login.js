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
    const existingUser = email
      ? await mailUserQuery(email)
      : await nickUserQuery(nick_name);

    if (!existingUser) {
      return res.status(401).json({
        message: errorMessages.invalidCredentials,
      });
    }

    if (existingUser.deleted_at !== null) {
      return res.status(403).json({
        message: errorMessages.invalidCredentials,
      });
    }

    const correctPass = await bcrypt.compare(password, existingUser.password);

    if (!correctPass) {
      return res.status(401).json({
        message: errorMessages.invalidCredentials,
      });
    }

    const token = jwt.sign({ sub: existingUser.id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    const { password: _, ...userValid } = existingUser;

    return res.status(200).json({ token });
  } catch (error) {
    return res.status(500).json({ message: errorMessages.InternalServerError });
  }
};

module.exports = loginUser;
