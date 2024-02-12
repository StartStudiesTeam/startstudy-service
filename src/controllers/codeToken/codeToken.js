const errorMessages = require("../../helpers/codeMessages/errorMessages");
const sucessMessages = require("../../helpers/codeMessages/sucessMessages");
const { currentTime } = require("../../helpers/helpersData/date");
const { generateToken } = require("../../helpers/authenticate/generateToken");
const { getMailAndCode, updateVerifyField } = require("../../model/Code");

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

    const accessToken = await generateToken(user);
    const { password: _, ...userValid } = user;

    return res
      .status(200)
      .json({ message: sucessMessages.userAcessLogin, body: { accessToken } });
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

module.exports = validationCodeToken;
