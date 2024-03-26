const UserMessageErrors = require("../../constants/Users/errors");
const UserMessageSuccess = require("../../constants/Users/successes");
const MessagesErros = require("../../constants/Generics/messages");
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
        message: UserMessageErrors.errorDeletingUser,
        body: {},
      });
    }

    const request = await DeleteUserById(id, currentTime);

    return res.status(204).json({
      statusCode: 204,
      message: UserMessageSuccess.successInDeletingUser,
      body: {},
    });
  } catch (error) {
    return res.status(400).json({
      statusCode: 400,
      message: MessagesErros.errorProcessingThisRequest,
      body: {},
    });
  }
};

module.exports = deleteUser;
