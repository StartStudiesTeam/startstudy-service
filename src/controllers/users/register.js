const bcrypt = require("bcrypt");
const prisma = require("../../database/prisma");
const sucessMessages = require("../../helpers/codeMessages/sucessMessages");
const errorMessages = require("../../helpers/codeMessages/errorMessages");
const codeToken = require("../../helpers/users/token");
const mailSendUserResgistered = require("../mails/sendMails");
const { currentTime } = require("../../helpers/helpersData/data");
const { findUserMail, findUserNick } = require("../../model/User");

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

    await prisma.$transaction(async () => {
      const user = await prisma.users.create({
        data: {
          name,
          email,
          password: passEncrypted,
          nick_name,
          phone_number,
          created_at: currentTime,
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
          code_token: codeToken.code_token,
          created_at: currentTime,
        },
      });
    });

    mailSendUserResgistered(name, email, codeToken.code_token);

    return res
      .status(201)
      .json({ message: sucessMessages.successfullyRegisteredUser });
  } catch (error) {
    return res
      .status(404)
      .json({ message: errorMessages.errorProcessingThisRequest });
  }
};

module.exports = registerUser;
