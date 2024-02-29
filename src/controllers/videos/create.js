const prisma = require("../../database/prisma");
const errorMessages = require("../../helpers/codeMessages/errorMessages");
const sucessMessagesRoadmap = require("../../helpers/codeMessages/roadmapSucessMessages");
const getRoadmap = require("../../models/Roadmap");
const { findUserMail } = require("../../models/User");

const createVideos = async (req, res) => {
  const { roadmapId, email, title, description, video, amountLike } = req.body;

  try {
    const user = await findUserMail(email);
    const roadmap = await getRoadmap(roadmapId);

    const videos = await prisma.$transaction(async () => {
      const videos = await prisma.videos.create({
        data: {
          user: {
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
      message: sucessMessagesRoadmap.successUpdateRoadmap,
      body: { createdVideos },
    });
  } catch (error) {
    return res
      .status(400)
      .json({ message: errorMessages.errorProcessingThisRequest });
  }
};

module.exports = createVideos;
