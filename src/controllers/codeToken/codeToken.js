const dayjs = require("dayjs");
const errorMessages = require("../../constants/codeMessages/errorMessages");
const sucessMessages = require("../../constants/codeMessages/sucessMessages");
const { afterDate, currentTime } = require("../../utils/date/date");
const { CreateAccessToken } = require("../../utils/authenticate/AccessToken");
const {
  GetTheMailAndCode,
  UpdateVerifiedField,
  GetFieldVerifyUserById,
} = require("../../models/Code");

const checkTokenValidity = async (req, res) => {
  const { email, codeToken } = req.body;

  try {
    const user = await GetTheMailAndCode(email, codeToken);

    if (!user) {
      return res.status(400).json({ message: errorMessages.invalidToken });
    }

    const fieldVerify = await GetFieldVerifyUserById(user.id);

    if (fieldVerify) {
      return res.status(400).json({ message: "usuário validado" });
    }

    const userCreatedAtUnix = dayjs(user.createdAt).unix();
    const isAfterCurrentTime = await afterDate(user.createdAt);

    if (isAfterCurrentTime) {
      return res.status(400).json({ message: errorMessages.tokenExpired });
    }

    const fieldUpdated = await UpdateVerifiedField(user.id, currentTime, true);
    const accessToken = await CreateAccessToken(user);

    return res.status(200).json({
      statusCode: 200,
      message: sucessMessages.successUpdateUser,
      body: { fieldUpdated, accessToken },
    });
  } catch (error) {
    return res.status(400).json({
      statusCode: 400,
      message: errorMessages.errorProcessingThisRequest,
      body: {},
    });
  }
};

module.exports = checkTokenValidity;
