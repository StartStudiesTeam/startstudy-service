const prisma = require("../../database/prisma");
const errorMessages = require("../../constants/codeMessages/errorMessages");
const sucessMessagesRoadmap = require("../../constants/codeMessages/roadmapSucessMessages");
const { getRoadmap } = require("../../models/Roadmap");
const { findUserMail } = require("../../models/User");

const createVideos = async (req, res) => {
  const { roadmapId, email, title, description, video, amountLike } = req.body;

  try {
    const user = await findUserMail(email);
    const roadmap = await getRoadmap(roadmapId);

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
          roadmapId: roadmap.id,
          videoId,
        },
      });
      return videos;
    });

    const { updatedAt, deletedAt: _, ...createdVideos } = videos;

    return res.status(200).json({
      statusCode: 200,
      message: sucessMessagesRoadmap.successUpdateRoadmap,
      body: { createdVideos },
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
