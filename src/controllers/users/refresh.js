const dayjs = require("dayjs");
const sucessMessages = require("../../helpers/codeMessages/sucessMessages");
const errorMessages = require("../../helpers/codeMessages/errorMessages");
const { validRefresh, deleteRefresh } = require("../../model/Refresh");
const { generateToken } = require("../../helpers/authenticate/generateToken");

const refreshTokenUser = async (req, res) => {
  const { refresh_token } = req.body;

  try {
    const validateRefresh = await validRefresh(refresh_token.id);

    if (!validateRefresh) {
      return res
        .status(400)
        .json({ message: errorMessages.invalidRefreshToken });
    }

    const verifyDateAccess = dayjs().isAfter(
      dayjs.unix(refresh_token.expiresIn)
    );

    const accessToken = await generateToken(refresh_token);

    if (verifyDateAccess) {
      const deleteAllRefresh = await deleteRefresh(validateRefresh.id);

      const newRefreshToken = await generateToken(validateRefresh.id);

      return res.status(200).json({
        message: sucessMessages.userAcessLogin,
        body: { accessToken, newRefreshToken },
      });
    }

    return res.status(200).json({
      message: sucessMessages.userAcessLogin,
      body: { accessToken },
    });
  } catch (error) {
    return res
      .status(404)
      .json({ message: errorMessages.errorProcessingThisRequest });
  }
};

module.exports = refreshTokenUser;
