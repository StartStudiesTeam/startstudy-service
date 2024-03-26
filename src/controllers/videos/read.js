const prisma = require("../../database/prisma");
const VideoMessageErrors = require("../../constants/Videos/errors");
const VideoMessageSuccess = require("../../constants/Videos/successes");
const { GetVideoById } = require("../../models/Video");

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

    const request = await prisma.$transaction(async () => {
      const video = await prisma.videosRoadmap.findFirst({
        where: {
          videoId,
          deletedAt: null,
        },
      });

      const comment = await prisma.comments.findMany({
        where: {
          videoId,
          deletedAt: null,
        },
      });

      const commentsComments = await prisma.commentsComments.findMany({
        where: {
          commentsId: comment.id,
          deletedAt: null,
        },
      });

      const likes = await prisma.likes.count({
        where: {
          videoId,
          deletedAt: null,
        },
      });

      return res.status(200).json({
        statusCode: 200,
        message: VideoMessageSuccess.successReadVideos,
        body: { video, comment, commentsComments, likes },
      });
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
