const bcrypt = require("bcrypt");
const errorMessages = require("../../constants/codeMessages/errorMessages.js");
const sucessMessages = require("../../constants/codeMessages/sucessMessages.js");
const { createRefresh } = require("../../models/Refresh.js");
const {
  findUserMail,
  findUserNick,
  findDeletedFieldUser,
} = require("../../models/User.js");
const {
  createAccessToken,
} = require("../../utils/authenticate/AccessToken.js");

const loginUser = async (req, res) => {
  const { nick_name, email, password } = req.body;

  try {
    const existingUser = email
      ? await findUserMail(email)
      : await findUserNick(nick_name);

    if (!existingUser) {
      return res
        .status(401)
        .json({ message: errorMessages.invalidCredentials });
    }

    const findDeleted = await findDeletedFieldUser(existingUser.id);

    if (!findDeleted) {
      return res.status(400).json({ message: errorMessages.invalidUser });
    }

    const correctPass = await bcrypt.compare(password, existingUser.password);

    if (!correctPass) {
      return res
        .status(401)
        .json({ message: errorMessages.invalidCredentials });
    }

    const accessToken = await createAccessToken(existingUser.id);
    const refreshToken = await createRefresh(existingUser.id);

    const { password: _, ...userValid } = existingUser;

    return res.status(200).json({
      statusCode: 200,
      message: sucessMessages.userAcessLogin,
      body: { accessToken, refreshToken },
    });
  } catch (error) {
    return res.status(400).json({
      statusCode: 400,
      message: errorMessages.errorProcessingThisRequest,
      body: {},
    });
  }
};

module.exports = loginUser;
