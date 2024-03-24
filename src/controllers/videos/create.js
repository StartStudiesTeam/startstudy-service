const prisma = require("../../database/prisma");
const errorMessages = require("../../constants/codeMessages/errorMessages");
const sucessMessagesRoadmap = require("../../constants/codeMessages/roadmapSucessMessages");
const { GetRoadmapById } = require("../../models/Roadmap");
const { GetUserByMail } = require("../../models/User");

const createVideos = async (req, res) => {
  const { roadmapId, email, title, description, video, amountLike } = req.body;

  try {
    const findRoadmap = await GetRoadmapById(roadmapId);

    if (!findRoadmap) {
      return res.status(404).json({
        statusCode: 404,
        message: errorMessages.errorProcessingThisRequest,
        body: {},
      });
    }

    const user = await GetUserByMail(email);

    const videos = await prisma.$transaction(async () => {
      const videos = await prisma.videos.create({
        data: {
          Users: {
            connect: {
              id: user.id,
            },
          },
          title,
          description,
          video,
          amountLike,
        },
      });

      const videoId = videos.id;

      await prisma.videosRoadmap.create({
        data: {
          roadmapId,
          videoId,
        },
      });

      const { updatedAt, deletedAt: _, ...response } = videos;
      return response;
    });

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

module.exports = createVideos;
