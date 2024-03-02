const prisma = require("../../database/prisma");
const errorMessages = require("../../helpers/codeMessages/errorMessages");
const sucessMessagesRoadmap = require("../../helpers/codeMessages/roadmapSucessMessages");
const { currentTime } = require("../../helpers/helpersData/date");

const updateBookmark = async (req, res) => {
  const { id, userId, videoId, roadmapId } = req.body;

  try {
    const update = await prisma.bookmarks.update({
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

    const { deletedAt: _, ...updateBookmark } = update;

    return res.status(200).json({
      statusCode: 200,
      message: sucessMessagesRoadmap.successUpdateRoadmap,
      body: { updateBookmark },
    });
  } catch (error) {
    return res
      .status(400)
      .json({ message: errorMessages.errorProcessingThisRequest });
  }
};

module.exports = updateBookmark;
