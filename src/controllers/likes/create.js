const LikeMessageErrors = require("../../constants/Likes/errors");
const LikeMessageSuccess = require("../../constants/Likes/successes");
const {
  CreateLike,
  CheckUserAndVideoLikeFields,
} = require("../../models/Like");

const createLike = async (req, res) => {
  const { userId, videoId, roadmapId } = req.body;

  try {
    const alreadyLiked = await CheckUserAndVideoLikeFields(
      userId,
      videoId,
      roadmapId
    );

    if (alreadyLiked) {
      return res.status(400).json({
        statusCode: 400,
        message: LikeMessageErrors.errorRegisteringLike,
        body: {},
      });
    }

    const data = await CreateLike(userId, videoId, roadmapId);

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
