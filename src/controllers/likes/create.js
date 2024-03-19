const errorMessages = require("../../constants/codeMessages/errorMessages");
const sucessMessages = require("../../constants/codeMessages/sucessMessages");
const { CreateLike } = require("../../models/Like");

const createLike = async (req, res) => {
  const { userId, videoId, roadmapId, commentsId, commentsCommentsId } =
    req.body;

  try {
    const like = await CreateLike(
      userId,
      videoId,
      roadmapId,
      commentsId,
      commentsCommentsId
    );

    return res.status(201).json({
      statusCode: 201,
      message: sucessMessages.createLikes,
      body: { like },
    });
  } catch (error) {
    return res.status(400).json({
      statusCode: 400,
      message: errorMessages.errorProcessingThisRequest,
      body: {},
    });
  }
};

module.exports = createLike;
