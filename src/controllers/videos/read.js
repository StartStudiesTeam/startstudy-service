const prisma = require("../../database/prisma");
const sucessMessages = require("../../constants/codeMessages/sucessMessages");
const errorMessages = require("../../constants/codeMessages/errorMessages");
const { GetVideo } = require("../../models/Video");

const readVideo = async (req, res) => {
  const { videoId } = req.body;

  try {
    const findVideo = await GetVideo(videoId);

    if (!findVideo) {
      return res.status(404).json({
        statusCode: 404,
        message: errorMessages.errorProcessingThisRequest,
        body: {},
      });
    }

    const request = await prisma.$transaction(async () => {
      const video = await prisma.videosRoadmap.findFirst({
        where: {
          videoId,
        },
      });

      const comment = await prisma.comments.findMany({
        where: {
          videoId,
        },
      });

      const commentsComments = await prisma.commentsComments.findMany({
        where: {
          commentsId: comment.id,
        },
      });

      const likes = await prisma.likes.count({
        where: {
          videoId,
        },
      });

      return res.status(200).json({
        statusCode: 200,
        message: sucessMessages.readVideos,
        body: { video, comment, commentsComments, likes },
      });
    });
  } catch (error) {
    return res.status(400).json({
      statusCode: 400,
      message: errorMessages.errorProcessingThisRequest,
      body: {},
    });
  }
};

module.exports = readVideo;
