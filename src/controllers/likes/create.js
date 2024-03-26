const LikeMessageErrors = require("../../constants/Likes/errors");
const LikeMessageSuccess = require("../../constants/Likes/successes");
const { CreateLike } = require("../../models/Like");

const createLike = async (req, res) => {
  const { userId, videoId, roadmapId, commentsId, commentsCommentsId } =
    req.body;

  try {
    const data = await CreateLike(
      userId,
      videoId,
      roadmapId,
      commentsId,
      commentsCommentsId
    );

    return res.status(201).json({
      statusCode: 201,
      message: LikeMessageSuccess.successfulInRegisteringLike,
      body: { data },
    });
  } catch (error) {
    return res.status(400).json({
      statusCode: 400,
      message: LikeMessageErrors.errorRegisteringLike,
      body: {},
    });
  }
};

module.exports = createLike;
