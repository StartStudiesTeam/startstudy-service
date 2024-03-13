const bcrypt = require("bcrypt");
const errorMessages = require("../../constants/codeMessages/errorMessages.js");
const sucessMessages = require("../../constants/codeMessages/sucessMessages.js");
const { CreateRefresh } = require("../../models/Refresh.js");
const {
  GetUserByMail,
  GetUserByNick,
  GetFieldDeletedByUser,
} = require("../../models/User.js");
const {
  CreateAccessToken,
} = require("../../utils/authenticate/AccessToken.js");

const loginUser = async (req, res) => {
  const { nick_name, email, password } = req.body;

  try {
    const user = email
      ? await GetUserByMail(email)
      : await GetUserByNick(nick_name);

    if (!user) {
      return res
        .status(401)
        .json({ message: errorMessages.invalidCredentials });
    }

    const fieldDeleted = await GetFieldDeletedByUser(user.id);

    if (!fieldDeleted) {
      return res.status(400).json({ message: errorMessages.invalidUser });
    }

    const correctPass = await bcrypt.compare(password, user.password);

    if (!correctPass) {
      return res
        .status(401)
        .json({ message: errorMessages.invalidCredentials });
    }

    const accessToken = await CreateAccessToken(user.id);
    const refreshToken = await CreateRefresh(user.id);

    const { password: _, ...response } = user;

    return res.status(200).json({
      statusCode: 200,
      message: sucessMessages.userAcessLogin,
      body: { response, accessToken, refreshToken },
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
