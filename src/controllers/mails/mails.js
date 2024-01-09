const knex = require("../../database/connection");
const { queryEmail } = require("../../helpers/users/validateUsers");

const queryCheckEmail = async (req, res) => {
  const { email } = req.body;

  try {
    const queryEmailExist = await queryEmail(email);
    if (!queryEmailExist) {
      return res.status(400).json({
        message: "Email inválido!",
      });
    }

    return res.json({ message: "Teste Mensagem" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = queryCheckEmail;
