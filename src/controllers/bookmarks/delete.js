const prisma = require("../../database/prisma");
const errorMessages = require("../../helpers/codeMessages/errorMessages");
const sucessMessagesRoadmap = require("../../helpers/codeMessages/roadmapSucessMessages");

const deleteBookmark = async (req, res) => {
  const { id } = req.body;

  try {
    const exclude = await prisma.bookmarks.delete({
      where: {
        id,
      },
    });

    return res.status(204).json({
      statusCode: 204,
      message: sucessMessagesRoadmap.successfullyRegisteredRoadmap,
      body: {},
    });
  } catch (error) {
    return res.status(400).json({
      statusCode: 400,
      message: errorMessages.errorProcessingThisRequest,
      body: {},
    });
  }
};

module.exports = deleteBookmark;
