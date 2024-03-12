const sucessMessages = require("../../constants/codeMessages/sucessMessages");
const errorMessages = require("../../constants/codeMessages/errorMessages");
const {
  CreateRefresh,
  GetRefresh,
  DeleteRefresh,
} = require("../../models/Refresh");
const { CreateAccessToken } = require("../../utils/authenticate/AccessToken");
const { afterDate } = require("../../utils/date/date");

const refreshTokenUser = async (req, res) => {
  const { refresh_token } = req.body;
  try {
    const validateRefresh = await GetRefresh(refresh_token);

    if (!validateRefresh) {
      return res
        .status(400)
        .json({ message: errorMessages.invalidRefreshToken });
    }

    const verifyDateAccess = await afterDate(validateRefresh.expiresIn);
    const accessToken = await CreateAccessToken(refresh_token);

    if (verifyDateAccess) {
      const deleteAllRefresh = await DeleteRefresh(validateRefresh.id);
      const newRefreshToken = await CreateRefresh(validateRefresh.usersId);

      return res.status(200).json({
        statusCode: 200,
        message: sucessMessages.userAcessLogin,
        body: { accessToken, newRefreshToken },
      });
    }

    return res.status(200).json({
      statusCode: 200,
      message: sucessMessages.userAcessLogin,
      body: { accessToken },
    });
  } catch (error) {
    return res.status(400).json({
      statusCode: 400,
      message: errorMessages.errorProcessingThisRequest,
      body: {},
    });
  }
};

module.exports = refreshTokenUser;
