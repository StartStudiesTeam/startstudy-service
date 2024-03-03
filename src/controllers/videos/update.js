const prisma = require("../../database/prisma");
const errorMessages = require("../../helpers/codeMessages/errorMessages");
const sucessMessagesRoadmap = require("../../helpers/codeMessages/roadmapSucessMessages");
const { currentTime } = require("../../helpers/helpersData/date");

const updateVideos = async (req, res) => {
  const { id, title, description, video, amountLike } = req.body;

  try {
    const videos = await prisma.videos.update({
      where: {
        id,
      },
      data: {
        title,
        description,
        video,
        amountLike,
        updatedAt: currentTime,
      },
    });

    const { deletedAt: _, ...updatedVideos } = videos;

    return res.status(200).json({
      statusCode: 200,
      message: sucessMessagesRoadmap.successUpdateRoadmap,
      body: { updatedVideos },
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
