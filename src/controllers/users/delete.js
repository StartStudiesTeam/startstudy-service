const knex = require("../../database/connection");
const errorMessages = require("../../helpers/codeMessages/errorMessages");
const sucessMessages = require("../../helpers/codeMessages/sucessMessages");
const { currentTime } = require("../../helpers/helpersData/data");

const deleteUser = async (req, res) => {
  const { id } = req.user;

  try {
    await knex("dateusers").update({ deleted_at: currentTime }).where({ id });

    return res.status(200).json({ message: sucessMessages.userDeleted });
  } catch (error) {
    return res.status(500).json({ message: errorMessages.InternalServerError });
  }
};

module.exports = deleteUser;
