const bcrypt = require("bcrypt");
const prisma = require("../../database/prisma");
const UserMessageSuccesses = require("../../constants/Users/successes");
const UserMessageErrors = require("../../constants/Users/errors");
const CodeToken = require("../../utils/user/token");
const SendRegisteredUserEmail = require("../../service/mail/Mails");
const { GetUserByMail, GetUserByNick } = require("../../models/User/User");
const { CreateAccessToken } = require("../../utils/authenticate/AccessToken");
const { CreateRefresh } = require("../../models/User/Refresh");

const registerUser = async (req, res) => {
  const { name, nick_name, email, password, phone_number } = req.body;

  try {
    const passEncrypted = await bcrypt.hash(password, 10);

    if (await GetUserByMail(email)) {
      return res.status(400).json({
        statusCode: 400,
        message: UserMessageErrors.existingUserError,
        body: {},
      });
    }

    if (await GetUserByNick(nick_name)) {
      return res.status(400).json({
        statusCode: 400,
        message: UserMessageErrors.invalidNicknameError,
        body: {},
      });
    }

    const user = await prisma.$transaction(async () => {
      const user = await prisma.users.create({
        data: {
          name,
          email,
          password: passEncrypted,
          nickName: nick_name,
          phoneNumber: phone_number,
        },
      });

      const userId = user.id;

      await prisma.codeToken.create({
        data: {
          Users: {
            connect: {
              id: userId,
            },
          },
          codeToken: CodeToken.code_token,
        },
      });

      const { updatedAt, deletedAt, password: _, ...response } = user;
      return response;
    });

    SendRegisteredUserEmail(name, email, CodeToken.code_token);

    const accessToken = await CreateAccessToken(user.id);
    const refreshToken = await CreateRefresh(user.id);

    return res.status(201).json({
      statusCode: 201,
      message: UserMessageSuccesses.successInRegisteringUser,
      body: { user, accessToken, refreshToken },
    });
  } catch (error) {
    return res.status(400).json({
      statusCode: 400,
      message: UserMessageErrors.errorWhenRegisteringUser,
      body: {},
    });
  }
};

module.exports = registerUser;
