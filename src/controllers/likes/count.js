const errorMessages = require("../../constants/codeMessages/errorMessages");
const sucessMessages = require("../../constants/codeMessages/sucessMessages");
const { CountLike } = require("../../models/Like");

const countLike = async (req, res) => {
  const { videoId, roadmapId, commentsId, commentsCommentsId } = req.body;

  try {
    const likes = await CountLike(
      videoId,
      roadmapId,
      commentsId,
      commentsCommentsId
    );

    return res.status(200).json({
      statusCode: 200,
      message: sucessMessages.countLikes,
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

module.exports = countLike;
