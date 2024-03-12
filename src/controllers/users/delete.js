const errorMessages = require("../../constants/codeMessages/errorMessages");
const sucessMessages = require("../../constants/codeMessages/sucessMessages");
const { currentTime } = require("../../utils/date/date");
const {
  DeleteUserById,
  GetUserByIdWithDeletedField,
} = require("../../models/User");

const deleteUser = async (req, res) => {
  const { id } = req.body;

  try {
    const findUser = await GetUserByIdWithDeletedField(id);

    if (!findUser) {
      return res.status(404).json({
        statusCode: 404,
        message: errorMessages.errorProcessingThisRequest,
        body: {},
      });
    }

    const request = await DeleteUserById(id, currentTime);

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
