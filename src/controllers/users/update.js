const sucessMessages = require("../../constants/codeMessages/sucessMessages");
const errorMessages = require("../../constants/codeMessages/errorMessages");
const {
  GetUserByMail,
  GetUserByNick,
  upgradeUser,
  GetUserByIdWithDeletedField,
} = require("../../models/User");
const { currentTime } = require("../../utils/date/date");
const { CreateAccessToken } = require("../../utils/authenticate/AccessToken");

const updateUser = async (req, res) => {
  const { id, name, nick_name, email, phone_number } = req.body;

  try {
    const mailUser = await GetUserByMail(email);
    const nickNameUser = await GetUserByNick(nick_name);
    const findUser = await GetUserByIdWithDeletedField(id);

    if (!findUser) {
      return res.status(404).json({
        statusCode: 404,
        message: errorMessages.errorProcessingThisRequest,
        body: {},
      });
    }

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

    const accessToken = await CreateAccessToken(response.id);

    return res.status(200).json({
      statusCode: 200,
      message: sucessMessages.successUpdateUser,
      body: { response, accessToken },
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
