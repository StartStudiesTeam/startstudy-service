const prisma = require("../../database/prisma");
const errorMessages = require("../../helpers/codeMessages/errorMessages");
const sucessMessagesRoadmap = require("../../helpers/codeMessages/roadmapSucessMessages");

const deleteVideo = async (req, res) => {
  const { id } = req.body;

  try {
    const exclude = await prisma.$transaction(async () => {
      const exclude = await prisma.videosRoadmap.deleteMany({
        where: {
          videoId: id,
        },
      });

      await prisma.videos.delete({
        where: {
          id,
        },
      });

      return exclude;
    });

    return res
      .status(204)
      .json({ message: sucessMessagesRoadmap.deletedRoadmap });
  } catch (error) {
    return res
      .status(400)
      .json({ message: errorMessages.errorProcessingThisRequest });
  }
};

module.exports = deleteVideo;
