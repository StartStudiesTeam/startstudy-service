const bcrypt = require("bcrypt");
const knex = require("../../database/connection");
const crypto = require("crypto");

const newPassword = async (req, res) => {
  const { password, newPassword } = req.body;
  const { id } = req.user;

  try {
    const correntPassword = await knex("dateusers").where({ id });

    if (correntPassword[0].password != password) {
      return res.status(400).json({ message: "Senha atual invalida!" });
    }
    await knex("dateusers").update({ password: newPassword }).where({ id });

    return res.status(200).json({ message: "Senha redefinida com sucesso!" });
  } catch (error) {
    return res.status(500).json({ message: "Erro interno no servidor" });
  }
};

module.exports = newPassword;
