const prisma = require("../../database/prisma");
const sucessMessages = require("../../constants/codeMessages/sucessMessages");
const errorMessages = require("../../constants/codeMessages/errorMessages");
const { GetRoadmapById } = require("../../models/Roadmap");

const readRoadmap = async (req, res) => {
  const { roadmapId } = req.body;

  try {
    const findRoadmap = await GetRoadmapById(roadmapId);

    if (!findRoadmap) {
      return res.status(404).json({
        statusCode: 404,
        message: errorMessages.errorProcessingThisRequest,
        body: {},
      });
    }

    const request = await prisma.$transaction(async () => {
      const video = await prisma.videosRoadmap.findFirst({
        where: {
          roadmapId,
          deletedAt: null,
        },
      });

      const comment = await prisma.comments.findMany({
        where: {
          roadmapId,
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
          roadmapId,
          deletedAt: null,
        },
      });

      const bookmark = await prisma.bookmarks.findMany({
        where: {
          roadmapId,
          deletedAt: null,
        },
      });

      return res.status(200).json({
        statusCode: 200,
        message: sucessMessages.readRoadmap,
        body: { video, comment, commentsComments, likes, bookmark },
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

module.exports = readRoadmap;
