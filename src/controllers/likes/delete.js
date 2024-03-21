const errorMessages = require("../../constants/codeMessages/errorMessages");
const sucessMessagesLikes = require("../../constants/codeMessages/sucessMessagesLikes");
const {
  GetLike,
  DeleteLike,
  GetFieldDeleteByLikeId,
} = require("../../models/Like");
const { currentTime } = require("../../utils/date/date");

const deleteLike = async (req, res) => {
  const { id } = req.body;

  try {
    const findLike = await GetLike(id);
    const likesDelete = await GetFieldDeleteByLikeId(id);

    if (!findLike || !likesDelete) {
      return res.status(404).json({
        statusCode: 404,
        message: errorMessages.errorProcessingThisRequest,
        body: {},
      });
    }

    const exclude = await DeleteLike(id, currentTime);

    return res.status(204).json({
      statusCode: 204,
      message: sucessMessagesLikes.deletedLikes,
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

module.exports = deleteLike;
