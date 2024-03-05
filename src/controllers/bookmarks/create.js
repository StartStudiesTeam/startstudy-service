const errorMessages = require("../../helpers/codeMessages/errorMessages");
const sucessMessagesRoadmap = require("../../helpers/codeMessages/roadmapSucessMessages");
const { postBookmark } = require("../../models/Bookmark");

const createBookmark = async (req, res) => {
  const { userId, videoId, roadmapId } = req.body;

  try {
    const create = await postBookmark(userId, videoId, roadmapId);

    return res.status(201).json({
      statusCode: 201,
      message: sucessMessagesRoadmap.successUpdateRoadmap,
      body: { create },
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
