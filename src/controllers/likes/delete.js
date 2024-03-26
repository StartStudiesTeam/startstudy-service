const LikeMessageErrors = require("../../constants/Likes/errors");
const LikeMessageSuccess = require("../../constants/Likes/successes");
const { GetLikeById, DeleteLike } = require("../../models/Like");
const { currentTime } = require("../../utils/date/date");

const deleteLike = async (req, res) => {
  const { id } = req.body;

  try {
    const findLike = await GetLikeById(id);

    if (!findLike) {
      return res.status(404).json({
        statusCode: 404,
        message: LikeMessageErrors.errorDeletingLike,
        body: {},
      });
    }

    const exclude = await DeleteLike(id, currentTime);

    return res.status(204).json({
      statusCode: 204,
      message: LikeMessageSuccess.successfulDeletingLike,
      body: {},
    });
  } catch (error) {
    return res.status(400).json({
      statusCode: 400,
      message: LikeMessageErrors.errorDeletingLike,
      body: {},
    });
  }
};

module.exports = deleteLike;
