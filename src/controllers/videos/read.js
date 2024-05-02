const VideoMessageErrors = require("../../constants/Videos/errors");
const VideoMessageSuccess = require("../../constants/Videos/successes");
const { GetVideoById, GetContentRelatedVideo } = require("../../models/Video");

const readVideo = async (req, res) => {
  const { videoId } = req.body;
  try {
    const findVideo = await GetVideoById(videoId);

    if (!findVideo) {
      return res.status(404).json({
        statusCode: 404,
        message: VideoMessageErrors.errorReadVideos,
        body: {},
      });
    }

    const data = await GetContentRelatedVideo(videoId);

    return res.status(200).json({
      statusCode: 200,
      message: VideoMessageSuccess.successReadVideos,
      body: { data },
    });
  } catch (error) {
    return res.status(400).json({
      statusCode: 400,
      message: VideoMessageErrors.errorReadVideos,
      body: {},
    });
  }
};

module.exports = readVideo;
