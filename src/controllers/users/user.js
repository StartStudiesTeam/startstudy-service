const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const knex = require("../../database/connection");
const transport = require("../../service/mail/connectionEmail.js");
const compileHtml = require("../../helpers/sendMail/compile.js");
const crypto = require("crypto");
const {
  queryEmail,
  queryNick,
} = require("../../helpers/users/validateUsers.js");

const registerUser = async (req, res) => {
  const { name, nick_name, email, password, phone_number } = req.body;

  try {
    const passEncrypted = await bcrypt.hash(password, 10);

    if (await queryEmail(email)) {
      return res.status(400).json({
        message: "Já existe usuário cadastrado com o e-mail informado.",
      });
    }

    if (await queryNick(nick_name)) {
      return res
        .status(400)
        .json({ message: "O campo nick_name precisa ser único" });
    }

    const tokenMail = crypto.randomBytes(3).toString("hex");

    const now = new Date();
    now.setHours(now.getHours() + 1); // Salvar no Banco de Dados

    await knex("dateusers").insert({
      name,
      nick_name,
      email,
      phone_number,
      password: passEncrypted,
    });

    const html = await compileHtml("./src/templates/register.html", {
      name: name,
      token: tokenMail,
    });

    transport.sendMail({
      from: `${process.env.EMAIL_NAME} <${process.env.EMAIL_FROM}`,
      to: `${name} <${email}>`,
      subject: `Solicitação de Cadastro no Start Study`,
      html,
    });

    return res.status(201).json({ message: "Usuário registrado com sucesso!" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

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

module.exports = {
  registerUser,
  loginUser,
};
