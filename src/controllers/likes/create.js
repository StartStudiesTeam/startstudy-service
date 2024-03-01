const prisma = require("../../database/prisma");
const errorMessages = require("../../helpers/codeMessages/errorMessages");
const sucessMessagesRoadmap = require("../../helpers/codeMessages/roadmapSucessMessages");

const createLike = async (req, res) => {
  const { userId, videoId, roadmapId } = req.body;

  try {
    const likes = await prisma.likes.create({
      data: {
        userId,
        videoId,
        roadmapId,
      },
    });

    const { updatedAt, deletedAt: _, ...createdLike } = likes;

    return res.status(201).json({
      statusCode: 201,
      message: sucessMessagesRoadmap.successfullyRegisteredRoadmap,
      body: { createdLike },
    });
  } catch (error) {
    return res
      .status(400)
      .json({ message: errorMessages.errorProcessingThisRequest });
  }
};

module.exports = createLike;
