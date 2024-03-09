const errorMessages = require("../../constants/codeMessages/errorMessages");
const sucessMessages = require("../../constants/codeMessages/sucessMessages");
const { currentTime } = require("../../utils/date/date");
const { createAccessToken } = require("../../utils/authenticate/AccessToken");
const { getMailAndCode, updateVerifyField } = require("../../models/Code");

const validationCodeToken = async (req, res) => {
  const { email, codeToken } = req.body;

  try {
    const user = await getMailAndCode(email, codeToken);

    if (!user) {
      return res.status(400).json({ message: errorMessages.invalidToken });
    }

    const verifyDate = user.createdAt < currentTime;

    if (verifyDate) {
      return res.status(400).json({ message: errorMessages.tokenExpired });
    }

    const updatedField = await updateVerifyField(user.id, currentTime, true);

    const accessToken = await createAccessToken(user);
    const { password: _, ...userValid } = user;

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

module.exports = validationCodeToken;
