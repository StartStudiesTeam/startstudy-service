const LikeMessageErrors = require("../../constants/Likes/errors");
const LikeMessageSuccess = require("../../constants/Likes/successes");
const { CountLike } = require("../../models/Like");

const countLike = async (req, res) => {
  const { videoId, roadmapId, commentsId, commentsCommentsId } = req.body;

  try {
    const data = await CountLike(
      videoId,
      roadmapId,
      commentsId,
      commentsCommentsId
    );

    return res.status(200).json({
      statusCode: 200,
      message: LikeMessageSuccess.successCountingLikes,
      body: { data },
    });
  } catch (error) {
    return res.status(400).json({
      statusCode: 400,
      message: LikeMessageErrors.errorCountingLikes,
      body: {},
    });
  }
};

module.exports = countLike;
