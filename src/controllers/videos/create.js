const VideoMessageErrors = require("../../constants/Videos/errors");
const VideoMessageSuccess = require("../../constants/Videos/successes");
const RoadmapMessageErrors = require("../../constants/Roadmaps/errors");
const { GetRoadmapById } = require("../../models/Roadmap");
const { CreateVideo } = require("../../models/Video");

const createVideos = async (req, res) => {
  const { roadmapId, title, description, video } = req.body;

  try {
    const findRoadmap = await GetRoadmapById(roadmapId);

    if (!findRoadmap) {
      return res.status(404).json({
        statusCode: 404,
        message: RoadmapMessageErrors.errorReadRoadmap,
        body: {},
      });
    }

    const data = await CreateVideo(
      findRoadmap.userId,
      title,
      description,
      video,
      findRoadmap.id
    );

    return res.status(201).json({
      statusCode: 201,
      message: VideoMessageSuccess.successfulInRegisteringVideo,
      body: { data },
    });
  } catch (error) {
    return res.status(400).json({
      statusCode: 400,
      message: VideoMessageErrors.errorRegisteringVideo,
      body: {},
    });
  }
};

module.exports = createVideos;
