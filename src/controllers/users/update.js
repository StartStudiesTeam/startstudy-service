const sucessMessages = require("../../helpers/codeMessages/sucessMessages");
const errorMessages = require("../../helpers/codeMessages/errorMessages");
const {
  findUserMail,
  findUserNick,
  upgradeUser,
} = require("../../models/User");

const { generateToken } = require("../../helpers/authenticate/generateToken");
const { currentTime } = require("../../helpers/helpersData/date");

const updateUser = async (req, res) => {
  const { id, name, nick_name, email, phone_number } = req.body;

  try {
    const mailUser = await findUserMail(email);
    const nickNameUser = await findUserNick(nick_name);

    const isInvalidMailUser = mailUser?.id && mailUser?.id !== id;
    const isInvalidNickNameUser = nickNameUser?.id && nickNameUser?.id !== id;

    if (isInvalidMailUser || isInvalidNickNameUser) {
      return res.status(400).json({ message: errorMessages.existingUser });
    }

    const response = await upgradeUser(
      id,
      name,
      email,
      phone_number,
      currentTime
    );

    const accessToken = await generateToken(response.id);

    return res.status(200).json({
      statusCode: 200,
      message: sucessMessages.successUpdateUser,
      body: { accessToken, response },
    });
  } catch (error) {
    return res.status(400).json({
      statusCode: 400,
      message: errorMessages.errorProcessingThisRequest,
      body: {},
    });
  }
};

module.exports = updateUser;
