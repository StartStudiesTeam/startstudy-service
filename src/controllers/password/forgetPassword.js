const knex = require("../../database/connection");

const passwordForget = async (req, res) => {
  const { newPassword } = req.body;
  const { id } = req.user;

  try {
    await knex("dateusers").update({ password: newPassword }).where({ id });

    res.status(200).json({ message: "Senha redefinida com sucesso!" });
  } catch (error) {
    return res.status(500).json({ message: "Erro interno no servidor" });
  }
};
