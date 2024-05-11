const bcrypt = require("bcrypt");
const MessageSuccesses = require("../../constants/Users/successes");
const MessageErrors = require("../../constants/Users/errors");
const CodeToken = require("../../utils/user/token");
const SendRegisteredUserEmail = require("../../service/mail/Mails");
const {
  GetUserByMail,
  GetUserByNick,
  CreateUser,
} = require("../../models/User");
const { CreateAccessToken } = require("../../utils/authenticate/AccessToken");
const { CreateRefresh } = require("../../models/Refresh");
const errorMiddleware = require("../../utils/error/apiError");

const registerUser = async (req, res) => {
  const { name, nick_name, email, password, phone_number } = req.body;

  try {
    const passEncrypted = await bcrypt.hash(password, 10);

    const isValidMail = await GetUserByMail(email);

    const errorMail = errorMiddleware(
      isValidMail,
      MessageErrors.existingUserError,
      400
    );

    const isValidNickName = await GetUserByNick(nick_name);

    const errorNickName = errorMiddleware(
      isValidNickName,
      MessageErrors.invalidNicknameError,
      400
    );

    const user = {
      name,
      email,
      passEncrypted,
      nick_name,
      phone_number,
    };

    const data = await CreateUser(user, CodeToken.code_token);

    SendRegisteredUserEmail(name, email, CodeToken.code_token);

    const accessToken = await CreateAccessToken(data.id);
    const refreshToken = await CreateRefresh(data.id);

    return res.status(201).json({
      statusCode: 201,
      message: MessageSuccesses.successInRegisteringUser,
      body: { data, accessToken, refreshToken },
    });
  } catch (error) {
    return res.status(error.statusCode).json({
      statusCode: error.statusCode,
      message: error.message,
      body: {},
    });
  }
};

module.exports = registerUser;
