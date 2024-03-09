const prisma = require("../../database/prisma");
const errorMessages = require("../../helpers/codeMessages/errorMessages");
const sucessMessages = require("../../helpers/codeMessages/sucessMessages");
const { currentTime } = require("../../helpers/helpersData/date");

const deleteUser = async (req, res) => {
  const { id } = req.body;

  try {
    const delUser = await prisma.users.update({
      where: {
        id,
      },
      data: {
        deletedAt: currentTime,
      },
    });

    return res.status(204).json({
      statusCode: 204,
      message: sucessMessages.userDeleted,
      body: {},
    });
  } catch (error) {
    return res.status(400).json({
      statusCode: 400,
      message: errorMessages.errorProcessingThisRequest,
      body: {},
    });
  }
};

module.exports = deleteUser;
