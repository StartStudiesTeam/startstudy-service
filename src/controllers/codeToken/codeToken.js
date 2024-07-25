const dayjs = require("dayjs");
const UserMessageErrors = require("../../constants/Users/errors");
const UserMessageSuccesses = require("../../constants/Users/successes");
const { afterDate, currentTime } = require("../../utils/date/date");
const { CreateAccessToken } = require("../../utils/authenticate/AccessToken");
const {
  GetTheMailAndCode,
  UpdateVerifiedField,
  GetConfirmationFieldByTokenUserId,
} = require("../../models/Code");

const checkTokenValidity = async (req, res) => {
  const { email, codeToken } = req.body;

  try {
    const user = await GetTheMailAndCode(email, codeToken);

    if (!user) {
      return res.status(401).json({
        statusCode: 401,
        message: UserMessageErrors.invalidTokenError,
        body: {},
      });
    }

    const fieldVerify = await GetConfirmationFieldByTokenUserId(user.id);

    if (!fieldVerify) {
      return res.status(200).json({
        statusCode: 200,
        message: UserMessageErrors.errorUserHasAlreadyBeenValidated,
        body: {},
      });
    }

    const userCreatedAtUnix = dayjs(user.createdAt).unix();
    const isAfterCurrentTime = await afterDate(user.createdAt);

    if (isAfterCurrentTime) {
      return res.status(400).json({
        statusCode: 400,
        message: UserMessageErrors.tokenExpiredError,
        body: {},
      });
    }

    const data = await UpdateVerifiedField(user.id, currentTime, true);
    const accessToken = await CreateAccessToken(user);

    return res.status(200).json({
      statusCode: 200,
      message: UserMessageSuccesses.successInVerifyingToken,
      body: { data, accessToken },
    });
  } catch (error) {
    return res.status(400).json({
      statusCode: 400,
      message: UserMessageErrors.tokenVerificationError,
      body: {},
    });
  }
};

module.exports = checkTokenValidity;
