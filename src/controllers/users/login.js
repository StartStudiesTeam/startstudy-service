const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
  queryEmail,
  queryNick,
} = require("../../helpers/users/validateUsers.js");

const loginUser = async (req, res) => {
  const { nick_name, email, password } = req.body;
  try {
    if (email) {
      const user = await queryEmail(email);
      if (!user) {
        return res.status(404).json({ message: "Email ou senha inválido(a)!" });
      }

      const correctPass = await bcrypt.compare(password, user.password);

      if (!correctPass) {
        return res.status(404).json({ message: "Email ou senha inválido(a)!" });
      }

      const token = jwt.sign({ sub: user.id }, process.env.SECRET_KEY, {
        expiresIn: "8h",
      });

      const { password: _, ...userValid } = user;

      return res.status(200).json({ token });
    }
    if (nick_name) {
      const nick = await queryNick(nick_name);
      if (!nick) {
        return res
          .status(404)
          .json({ message: "Nick-name ou senha inválido(a)!" });
      }
      const correctPass = await bcrypt.compare(password, nick.password);

      if (!correctPass) {
        return res
          .status(404)
          .json({ message: "Nick-name ou senha inválido(a)!" });
      }

      const token = jwt.sign({ sub: nick.id }, process.env.SECRET_KEY, {
        expiresIn: "8h",
      });

      const { password: _, ...userValid } = nick;

      return res.status(200).json({ token });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = loginUser;
