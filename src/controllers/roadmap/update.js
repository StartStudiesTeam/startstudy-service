const prisma = require("../../database/prisma");
const errorMessages = require("../../helpers/codeMessages/errorMessages");
const sucessMessagesRoadmap = require("../../helpers/codeMessages/roadmapSucessMessages");
const { currentTime } = require("../../helpers/helpersData/date");

const updateRoadmap = async (req, res) => {
  const { id, title, description } = req.body;

  try {
    const roadmap = await prisma.roadmap.update({
      where: {
        id,
      },
      data: {
        title,
        description,
        updatedAt: currentTime,
      },
    });

    const { deletedAt: _, ...updatedRoadmap } = roadmap;

    return res.status(200).json({
      message: sucessMessagesRoadmap.successUpdateRoadmap,
      body: { updatedRoadmap },
    });
  } catch (error) {
    return res
      .status(400)
      .json({ message: errorMessages.errorProcessingThisRequest });
  }
};

module.exports = updateRoadmap;
