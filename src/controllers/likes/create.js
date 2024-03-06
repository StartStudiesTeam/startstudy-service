const errorMessages = require("../../helpers/codeMessages/errorMessages");
const sucessMessagesRoadmap = require("../../helpers/codeMessages/roadmapSucessMessages");
const { postLike } = require("../../models/Like");

const createLike = async (req, res) => {
  const { userId, videoId, roadmapId } = req.body;

  try {
    const like = await postLike(userId, videoId, roadmapId);

    return res.status(201).json({
      statusCode: 201,
      message: sucessMessagesRoadmap.successfullyRegisteredRoadmap,
      body: { like },
    });
  } catch (error) {
    return res.status(400).json({
      statusCode: 400,
      message: errorMessages.errorProcessingThisRequest,
      body: {},
    });
  }
};

module.exports = createLike;
