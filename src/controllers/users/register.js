const bcrypt = require("bcrypt");
const knex = require("../../database/connection");
const crypto = require("crypto");
const {
  queryEmail,
  queryNick,
} = require("../../helpers/users/validateUsers.js");
const mailSendUserResgistered = require("../mails/sendEmail");

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

    const newUser = {
      name,
      email,
      password: passEncrypted,
      nick_name,
      phone_number,
      created_at: new Date(),
    };

    const codeToken = {
      code_token: crypto.randomBytes(3).toString("hex"),
      created_at: new Date(),
    };

    await knex
      .transaction((trx) => {
        return trx("dateusers")
          .insert(newUser)
          .then(({ insertedRowIds }) => {
            const userId = insertedRowIds[0];
            codeToken.user_id = userId;
            return trx("token_confirmation").insert(codeToken);
          })
          .then(() => trx.commit())
          .catch(trx.rollback);
      })
      .then(() => {
        mailSendUserResgistered(name, email, codeToken.code_token);
      })
      .catch((error) => {
        return res.status(500).json({ message: "Erro interno do servidsor!" });
      });

    return res.status(201).json({ message: "Usuário registrado com sucesso!" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = registerUser;
