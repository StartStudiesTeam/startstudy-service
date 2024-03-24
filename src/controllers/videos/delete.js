const prisma = require("../../database/prisma");
const errorMessages = require("../../constants/codeMessages/errorMessages");
const sucessMessagesRoadmap = require("../../constants/codeMessages/roadmapSucessMessages");
const { GetVideo } = require("../../models/Video");
const { currentTime } = require("../../utils/date/date");

const deleteVideo = async (req, res) => {
  const { id } = req.body;

  try {
    const findVideo = await GetVideo(id);

    if (!findVideo) {
      return res.status(404).json({
        statusCode: 404,
        message: errorMessages.errorProcessingThisRequest,
        body: {},
      });
    }

    const video = await prisma.$transaction(async () => {
      const request = await prisma.videosRoadmap.updateMany({
        where: {
          videoId: id,
        },
        data: {
          deletedAt: currentTime,
        },
      });

      await prisma.videos.update({
        where: {
          id,
        },
        data: {
          deletedAt: currentTime,
        },
      });

      return request;
    });

    return res.status(204).json({
      statusCode: 204,
      message: sucessMessagesRoadmap.deletedRoadmap,
      body: {},
    });
  } catch (error) {
    return res.status(400).json({
      statusCode: 400,
      message: errorMessages.errorProcessingThisRequest,
      body: {},
    });
  }
};

module.exports = deleteVideo;
