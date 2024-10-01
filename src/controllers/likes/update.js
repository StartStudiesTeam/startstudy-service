const LikeMessageErrors = require("../../constants/Likes/errors");
const LikeMessageSuccess = require("../../constants/Likes/successes");
const { currentTime } = require("../../utils/date/date");
const { UpdateLike, GetLikeById } = require("../../models/Roadmap/Like");

const updateLike = async (req, res) => {
  const { id, userId } = req.body;

  try {
    const findLike = await GetLikeById(id);

    if (!findLike) {
      return res.status(404).json({
        statusCode: 404,
        message: LikeMessageErrors.errorUpdatingLike,
        body: {},
      });
    }
    const data = await UpdateLike(id, userId, currentTime);

    return res.status(200).json({
      statusCode: 200,
      message: LikeMessageSuccess.successUpdatingLike,
      body: { data },
    });
  } catch (error) {
    return res.status(400).json({
      statusCode: 400,
      message: LikeMessageErrors.errorUpdatingLike,
      body: {},
    });
  }
};

module.exports = updateLike;
