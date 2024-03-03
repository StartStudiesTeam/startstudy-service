const prisma = require("../../database/prisma");
const errorMessages = require("../../helpers/codeMessages/errorMessages");
const sucessMessagesRoadmap = require("../../helpers/codeMessages/roadmapSucessMessages");

const createBookmark = async (req, res) => {
  const { userId, videoId, roadmapId } = req.body;

  try {
    const create = await prisma.bookmarks.create({
      data: {
        userId,
        videoId,
        roadmapId,
      },
    });

    const { updatedAt, deletedAt: _, ...createdBookmars } = create;

    return res.status(201).json({
      statusCode: 201,
      message: sucessMessagesRoadmap.successUpdateRoadmap,
      body: { createdBookmars },
    });
  } catch (error) {
    return res.status(400).json({
      statusCode: 400,
      message: errorMessages.errorProcessingThisRequest,
      body: {},
    });
  }
};

module.exports = createBookmark;
