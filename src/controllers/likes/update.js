const prisma = require("../../database/prisma");
const errorMessages = require("../../helpers/codeMessages/errorMessages");
const sucessMessagesRoadmap = require("../../helpers/codeMessages/roadmapSucessMessages");
const { currentTime } = require("../../helpers/helpersData/date");

const updateLike = async (req, res) => {
  const { id, userId, videoId, roadmapId } = req.body;

  try {
    const likes = await prisma.likes.update({
      where: {
        id,
      },
      data: {
        userId,
        videoId,
        roadmapId,
        updatedAt: currentTime,
      },
    });

    return res.status(200).json({
      statusCode: 200,
      message: sucessMessagesRoadmap.successfullyRegisteredRoadmap,
      body: { likes },
    });
  } catch (error) {
    return res
      .status(400)
      .json({ message: errorMessages.errorProcessingThisRequest });
  }
};

module.exports = updateLike;
