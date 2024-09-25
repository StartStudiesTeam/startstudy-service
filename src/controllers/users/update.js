const UserMessageErrors = require("../../constants/Users/errors");
const UserMessageSuccesses = require("../../constants/Users/successes");
const MessagesErros = require("../../constants/Generics/messages");
const {
  GetUserByMail,
  GetUserByNick,
  UpdateMainUserData,
  GetUserByIdWithDeletedField,
} = require("../../models/User/User");
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
        message: UserMessageErrors.errorUpdatingUser,
        body: {},
      });
    }

    const isInvalidMailUser = mailUser?.id && mailUser?.id !== id;
    const isInvalidNickNameUser = nickNameUser?.id && nickNameUser?.id !== id;

    if (isInvalidMailUser || isInvalidNickNameUser) {
      return res.status(400).json({
        statusCode: 400,
        message: UserMessageErrors.existingUserError,
        body: {},
      });
    }

    const data = await UpdateMainUserData(
      id,
      name,
      email,
      phone_number,
      currentTime
    );

    const accessToken = await CreateAccessToken(data.id);

    return res.status(200).json({
      statusCode: 200,
      message: UserMessageSuccesses.successfulUpdatingUser,
      body: { data, accessToken },
    });
  } catch (error) {
    return res.status(400).json({
      statusCode: 400,
      message: MessagesErros.errorProcessingThisRequest,
      body: {},
    });
  }
};

module.exports = updateUser;
