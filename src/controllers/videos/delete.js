const VideoMessageErrors = require("../../constants/Videos/errors");
const VideoMessageSuccess = require("../../constants/Videos/successes");
const { GetVideoById, DeleteVideo } = require("../../models/Video");
const { currentTime } = require("../../utils/date/date");

const deleteVideo = async (req, res) => {
  const { id } = req.body;

  try {
    const findVideo = await GetVideoById(id);

    if (!findVideo) {
      return res.status(404).json({
        statusCode: 404,
        message: VideoMessageErrors.errorDeletingVideo,
        body: {},
      });
    }

    const video = await DeleteVideo(id, currentTime);

    return res.status(204).json({
      statusCode: 204,
      message: VideoMessageSuccess.successfulDeletingVideo,
      body: {},
    });
  } catch (error) {
    return res.status(400).json({
      statusCode: 400,
      message: VideoMessageErrors.errorDeletingVideo,
      body: {},
    });
  }
};

module.exports = deleteVideo;
