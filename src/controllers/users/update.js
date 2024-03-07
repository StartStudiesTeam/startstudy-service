const prisma = require("../../database/prisma");
const sucessMessages = require("../../helpers/codeMessages/sucessMessages");
const errorMessages = require("../../helpers/codeMessages/errorMessages");
const { findUserMail, findUserNick } = require("../../models/User");
const codeToken = require("../../helpers/users/token");
const mailSendUserResgistered = require("../../service/mail/Mails");
const { generateToken } = require("../../helpers/authenticate/generateToken");
const { currentTime } = require("../../helpers/helpersData/date");

const updateUser = async (req, res) => {
  const { id, name, nick_name, email, phone_number } = req.body;

  try {
    const userEmail = await findUserMail(email);

    if (userEmail.id !== id) {
      mailSendUserResgistered(name, email);
      return res.status(400).json({
        message: errorMessages.existingUser,
      });
    }
    const userNick = await findUserNick(nick_name);

    if (userNick.id !== id) {
      console.log(userNick.id);
      return res.status(400).json({ message: errorMessages.uniqueNickName });
    }

    const updateUser = await prisma.$transaction(async () => {
      const updateUser = await prisma.users.update({
        data: {
          name,
          email,
          nickName: nick_name,
          phoneNumber: phone_number,
          updatedAt: currentTime,
          verifyMail: null,
        },
      });

      const userId = updateUser.id;

      await prisma.codeToken.update({
        data: {
          Users: {
            connect: {
              id: userId,
            },
          },
          codeToken: codeToken.code_token,
        },
      });
      return updateUser;
    });

    mailSendUserResgistered(name, email, codeToken.code_token);

    const accessToken = await generateToken(updateUser.id);

    const { deletedAt, password: _, ...updatedUser } = updateUser;

    return res.status(200).json({
      statusCode: 200,
      message: sucessMessages.successUpdateUser,
      body: { accessToken, updatedUser },
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      statusCode: 400,
      message: errorMessages.errorProcessingThisRequest,
      body: {},
    });
  }
};

module.exports = updateUser;
