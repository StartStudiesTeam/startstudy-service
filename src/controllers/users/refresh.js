const UserMessageSuccesseses = require("../../constants/Users/successes");
const UserMessageErrors = require("../../constants/Users/errors");
const {
  CreateRefresh,
  GetRefresh,
  DeleteRefresh,
} = require("../../models/User/Refresh");
const { CreateAccessToken } = require("../../utils/authenticate/AccessToken");
const { afterDate } = require("../../utils/date/date");

const refreshTokenUser = async (req, res) => {
  const { refresh_token } = req.body;

  try {
    const validateRefresh = await GetRefresh(refresh_token);

    if (!validateRefresh) {
      return res.status(401).json({
        statusCode: 401,
        message: UserMessageErrors.invalidRefreshTokeError,
        body: {},
      });
    }

    const verifyDateAccess = await afterDate(validateRefresh.expiresIn);
    const accessToken = await CreateAccessToken(refresh_token);

    if (verifyDateAccess) {
      const deleteAllRefresh = await DeleteRefresh(validateRefresh.id);
      const newRefreshToken = await CreateRefresh(validateRefresh.usersId);

      return res.status(201).json({
        statusCode: 201,
        message: UserMessageSuccesseses.successfulUserLogin,
        body: { accessToken, newRefreshToken },
      });
    }

    return res.status(201).json({
      statusCode: 201,
      message: UserMessageSuccesseses.successfulUserLogin,
      body: { accessToken },
    });
  } catch (error) {
    return res.status(400).json({
      statusCode: 400,
      message: UserMessageErrors.userRefreshError,
      body: {},
    });
  }
};

module.exports = refreshTokenUser;
