const bcrypt = require("bcrypt");
const {
  getByNickname,
  getByMail,
  getVerifyMail,
} = require("../../helpers/users/helpersUsers.js");
const errorMessages = require("../../helpers/codeMessages/errorMessages");
const sucessMessages = require("../../helpers/codeMessages/sucessMessages.js");
const { createRefresh } = require("../../model/Refresh.js");
const {
  generateToken,
} = require("../../helpers/authenticate/generateToken.js");

const loginUser = async (req, res) => {
  const { nick_name, email, password } = req.body;

  const userAcess = nick_name ?? email;

  try {
    const existingUser = email
      ? await getByMail(email)
      : await getByNickname(nick_name);

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

    const emailQueryLogin = await getVerifyMail(userAcess);

    if (emailQueryLogin) {
      return res.json({ message: errorMessages.loginErrorEmailNotValidated });
    }

    const correctPass = await bcrypt.compare(password, existingUser.password);

    if (!correctPass) {
      return res.status(401).json({
        message: errorMessages.invalidCredentials,
      });
    }

    const accessToken = await generateToken(existingUser.id);
    const refreshToken = await createRefresh(existingUser.id);

    const { password: _, ...userValid } = existingUser;

    return res.status(200).json({
      message: sucessMessages.userAcessLogin,
      body: { accessToken, refreshToken },
    });
  } catch (error) {
    return res
      .status(404)
      .json({ message: errorMessages.errorProcessingThisRequest });
  }
};

module.exports = loginUser;
