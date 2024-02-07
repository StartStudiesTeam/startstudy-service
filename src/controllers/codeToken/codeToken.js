const errorMessages = require("../../helpers/codeMessages/errorMessages");
const sucessMessages = require("../../helpers/codeMessages/sucessMessages");
const { currentTime } = require("../../helpers/helpersData/date");
const { generateToken } = require("../../helpers/authenticate/generateToken");
const { getMailAndCode, updatedCodeTokenField } = require("../../model/Code");

const validationCodeToken = async (req, res) => {
  const { email, codeToken } = req.body;

  try {
    const codeUser = await getMailAndCode(email, codeToken);

    if (!codeUser) {
      return res.status(400).json({ message: errorMessages.invalidToken });
    }

    const verifyDate = codeUser.createdAt < currentTime;

    if (verifyDate) {
      return res.status(400).json({ message: errorMessages.tokenExpired });
    }

    const updatedField = await updatedCodeTokenField(codeUser.id, currentTime);
    const accessToken = await generateToken(codeUser);

    const { password: _, ...userValid } = codeUser;

    return res
      .status(200)
      .json({ message: sucessMessages.userAcessLogin, body: { accessToken } });
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

module.exports = validationCodeToken;
