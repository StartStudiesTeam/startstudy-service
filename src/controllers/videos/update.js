const VideoMessageErrors = require("../../constants/Videos/errors");
const VideoMessageSuccess = require("../../constants/Videos/successes");
const { currentTime } = require("../../utils/date/date");
const {
  UpdateFieldVideosRoadmap,
  UpdateAllVideoData,
  GetVideoById,
} = require("../../models/Roadmap/Video");

const updateVideos = async (req, res) => {
  const { id, title, description, video } = req.body;

  try {
    const findVideo = await GetVideoById(id);

    if (!findVideo) {
      return res.status(404).json({
        statusCode: 404,
        message: VideoMessageErrors.errorReadVideos,
        body: {},
      });
    }
    const videosRoadmap = UpdateFieldVideosRoadmap(id, currentTime);

    const data = await UpdateAllVideoData(
      id,
      title,
      description,
      video,
      currentTime
    );

    return res.status(200).json({
      statusCode: 200,
      message: VideoMessageSuccess.successUpdatingVideo,
      body: { data },
    });
  } catch (error) {
    return res.status(400).json({
      statusCode: 400,
      message: VideoMessageErrors.errorUpdatingVideo,
      body: {},
    });
  }
};

module.exports = updateVideos;
