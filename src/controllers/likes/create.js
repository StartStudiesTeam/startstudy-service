const LikeMessageErrors = require("../../constants/Likes/errors");
const LikeMessageSuccess = require("../../constants/Likes/successes");
const {
  CreateLike,
  CheckUserAndVideoLikeFields,
  LikeAgain,
} = require("../../models/Like");
const { currentTime } = require("../../utils/date/date");

const createLike = async (req, res) => {
  const { userId, videoId, roadmapId } = req.body;

  try {
    const alreadyLiked = await CheckUserAndVideoLikeFields(
      userId,
      videoId,
      roadmapId
    );

    if (alreadyLiked) {
      const newLikeValue = !alreadyLiked.likes;
      await LikeAgain(alreadyLiked.id, currentTime, newLikeValue);

      return res.status(204).send();
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
