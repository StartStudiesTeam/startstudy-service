const bcrypt = require('bcrypt');
const knex = require('../../database/connection');
const { queryEmail, queryNick } = require('../../helpers/users/validateUsers.js');

const registerUser = async (req, res) => {
  const {
    name, nick_name, email, password, phone_number,
  } = req.body;

  try {
    const passEncrypted = await bcrypt.hash(password, 10);

    if (await queryEmail(email)) {
      return res.status(400).json({ message: 'Já existe usuário cadastrado com o e-mail informado.' });
    }

    if (await queryNick(nick_name)) {
      return res.status(400).json({ message: 'O campo nick_name precisa ser único' });
    }

    const registerUser = await knex('dateusers').insert({
      name, nick_name, email, phone_number, password: passEncrypted,
    });

    return res.status(201).json({ message: 'User registered successfully! ' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  registerUser,
};
