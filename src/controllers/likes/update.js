const errorMessages = require("../../constants/codeMessages/errorMessages");
const { currentTime } = require("../../utils/date/date");
const {
  UpgradeLike,
  GetLike,
  GetFieldDeleteByLikeId,
} = require("../../models/Like");
const sucessMessagesLikes = require("../../constants/codeMessages/sucessMessagesLikes");

const updateLike = async (req, res) => {
  const { id, userId } = req.body;

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
    const likes = await UpgradeLike(id, userId, currentTime);

    return res.status(200).json({
      statusCode: 200,
      message: sucessMessagesLikes.updateLike,
      body: { likes },
    });
  } catch (error) {
    return res.status(400).json({
      statusCode: 400,
      message: errorMessages.errorProcessingThisRequest,
      body: {},
    });
  }
};

module.exports = updateLike;
