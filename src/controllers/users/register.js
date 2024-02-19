const bcrypt = require("bcrypt");
const prisma = require("../../database/prisma");
const sucessMessages = require("../../helpers/codeMessages/sucessMessages");
const errorMessages = require("../../helpers/codeMessages/errorMessages");
const codeToken = require("../../helpers/users/token");
const mailSendUserResgistered = require("../mails/sendMails");
const { findUserMail, findUserNick } = require("../../models/User");
const { generateToken } = require("../../helpers/authenticate/generateToken");
const { createRefresh } = require("../../models/Refresh");

const registerUser = async (req, res) => {
  const { name, nick_name, email, password, phone_number } = req.body;

  try {
    const passEncrypted = await bcrypt.hash(password, 10);

    if (await findUserMail(email)) {
      return res.status(400).json({
        message: errorMessages.existingUser,
      });
    }

    if (await findUserNick(nick_name)) {
      return res.status(400).json({ message: errorMessages.uniqueNickName });
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
          users: {
            connect: {
              id: userId,
            },
          },
          codeToken: codeToken.code_token,
        },
      });
      return user;
    });

    mailSendUserResgistered(name, email, codeToken.code_token);

    const accessToken = await generateToken(user.id);
    const refreshToken = await createRefresh(user.id);

    const { password: _, ...userValid } = user;

    return res.status(201).json({
      message: sucessMessages.successfullyRegisteredUser,
      body: { accessToken, refreshToken },
    });
  } catch (error) {
    return res
      .status(404)
      .json({ message: errorMessages.errorProcessingThisRequest });
  }
};

module.exports = registerUser;
