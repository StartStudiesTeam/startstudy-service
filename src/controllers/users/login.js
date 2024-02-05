const bcrypt = require("bcrypt");
const errorMessages = require("../../helpers/codeMessages/errorMessages");
const sucessMessages = require("../../helpers/codeMessages/sucessMessages.js");
const { createRefresh } = require("../../model/Refresh.js");
const {
  generateToken,
} = require("../../helpers/authenticate/generateToken.js");
const {
  findUserMail,
  findUserNick,
  findDeletedFieldUser,
} = require("../../model/User.js");

const loginUser = async (req, res) => {
  const { nick_name, email, password } = req.body;

  try {
    const existingUser = email
      ? await findUserMail(email)
      : await findUserNick(nick_name);

    if (!existingUser) {
      return res
        .status(401)
        .json({ message: errorMessages.invalidCredentials });
    }

    const findDeleted = await findDeletedFieldUser(existingUser.id);

    if (!findDeleted) {
      return res.status(400).json({ message: errorMessages.invalidUser });
    }

    const correctPass = await bcrypt.compare(password, existingUser.password);

    if (!correctPass) {
      return res
        .status(401)
        .json({ message: errorMessages.invalidCredentials });
    }

    const accessToken = await generateToken(existingUser.id);
    const refreshToken = await createRefresh(existingUser.id);

    const { password: _, ...userValid } = existingUser;

    return res.status(200).json({
      message: sucessMessages.userAcessLogin,
      body: { accessToken, refreshToken },
    });
  } catch (error) {
    return res
      .status(404)
      .json({ message: errorMessages.errorProcessingThisRequest });
  }
};

module.exports = loginUser;
