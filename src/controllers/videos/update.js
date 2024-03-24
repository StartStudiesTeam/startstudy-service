const errorMessages = require("../../constants/codeMessages/errorMessages");
const sucessMessagesRoadmap = require("../../constants/codeMessages/roadmapSucessMessages");
const { currentTime } = require("../../utils/date/date");
const {
  UpdateFieldVideosRoadmap,
  UpdateAllVideoData,
  GetVideoById,
} = require("../../models/Video");

const updateVideos = async (req, res) => {
  const { id, title, description, video, amountLike } = req.body;

  try {
    const findVideo = await GetVideoById(id);

    if (!findVideo) {
      return res.status(404).json({
        statusCode: 404,
        message: errorMessages.errorProcessingThisRequest,
        body: {},
      });
    }
    const videosRoadmap = UpdateFieldVideosRoadmap(id, currentTime);

    const videos = await UpdateAllVideoData(
      id,
      title,
      description,
      video,
      amountLike,
      currentTime
    );

    return res.status(200).json({
      statusCode: 200,
      message: sucessMessagesRoadmap.successUpdateRoadmap,
      body: { videos },
    });
  } catch (error) {
    return res.status(400).json({
      statusCode: 400,
      message: errorMessages.errorProcessingThisRequest,
      body: {},
    });
  }
};

module.exports = updateVideos;
