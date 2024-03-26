const prisma = require("../../database/prisma");
const VideoMessageErrors = require("../../constants/Videos/errors");
const VideoMessageSuccess = require("../../constants/Videos/successes");
const RoadmapMessageErrors = require("../../constants/Roadmaps/errors");
const { GetRoadmapById } = require("../../models/Roadmap");
const { GetUserByMail } = require("../../models/User");

const createVideos = async (req, res) => {
  const { roadmapId, email, title, description, video, amountLike } = req.body;

  try {
    const findRoadmap = await GetRoadmapById(roadmapId);

    if (!findRoadmap) {
      return res.status(404).json({
        statusCode: 404,
        message: RoadmapMessageErrors.errorReadRoadmap,
        body: {},
      });
    }

    const user = await GetUserByMail(email);

    const data = await prisma.$transaction(async () => {
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
