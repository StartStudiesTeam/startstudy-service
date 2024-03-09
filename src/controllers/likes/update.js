const errorMessages = require("../../constants/codeMessages/errorMessages");
const sucessMessagesRoadmap = require("../../constants/codeMessages/roadmapSucessMessages");
const { currentTime } = require("../../utils/date/date");
const { upgradeLike } = require("../../models/Like");

const updateLike = async (req, res) => {
  const { id, userId, videoId, roadmapId } = req.body;

  try {
    const likes = await upgradeLike(
      id,
      userId,
      videoId,
      roadmapId,
      currentTime
    );

    return res.status(200).json({
      statusCode: 200,
      message: sucessMessagesRoadmap.successfullyRegisteredRoadmap,
      body: { likes },
    });
  } catch (error) {
    return res.status(400).json({
      statusCode: 400,
      message: errorMessages.errorProcessingThisRequest,
      body: {},
    });
  }
};

module.exports = updateLike;
