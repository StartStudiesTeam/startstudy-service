const knex = require("../../database/connection");

const { queryEmail } = require("../../helpers/users/validateUsers");

const queryValidationMail = async (req, res) => {
  const { email, token } = req.body;
  try {
    const emailQueryExist = await queryEmail(email);

    if (!emailQueryExist) {
      return res.status(400).json({
        message: "Email ou token inválido(a)!",
      });
    }

    const tokenValidate = await knex("dateusers")
      .select("token_user")
      .where({ token_user: token })
      .first();

    if (!tokenValidate) {
      return res.status(400).json({ message: "Token inválido!" });
    }

    return res.json({ message: "Usuário Válidado com Sucesso!" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  queryValidationMail,
};
