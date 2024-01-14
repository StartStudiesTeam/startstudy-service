const bcrypt = require("bcrypt");
const knex = require("../../database/connection");
const mailSendUserResgistered = require("../mails/sendEmail");
const crypto = require("crypto");
const {
  nickUserQuery,
  mailUserQuery,
} = require("../../helpers/users/helpersUsers");

const registerUser = async (req, res) => {
  const { name, nick_name, email, password, phone_number } = req.body;

  try {
    const passEncrypted = await bcrypt.hash(password, 10);

    if (await mailUserQuery(email)) {
      return res.status(400).json({
        message: "Já existe usuário cadastrado com o e-mail informado.",
      });
    }

    if (await nickUserQuery(nick_name)) {
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

    await knex.transaction(async (trx) => {
      const [insertedRow] = await trx("dateusers")
        .insert(newUser)
        .returning("*");
      userId = insertedRow.id;
      codeToken.user_id = userId;

      await trx("token_confirmation").insert(codeToken);
      await trx.commit();
    });

    mailSendUserResgistered(name, email, codeToken.code_token);

    return res.status(201).json({ message: "Usuário registrado com sucesso!" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = registerUser;
