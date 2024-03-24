const errorMessages = require("../../constants/codeMessages/errorMessages");
const sucessMessagesRoadmap = require("../../constants/codeMessages/roadmapSucessMessages");
const { CreateBookmark } = require("../../models/Bookmark");
const { GetRoadmapById } = require("../../models/Roadmap");
const { GetFieldDeletedByUser } = require("../../models/User");

const createBookmark = async (req, res) => {
  const { userId, roadmapId } = req.body;

  try {
    const user = await GetFieldDeletedByUser(userId);
    const roadmap = await GetRoadmapById(roadmapId);

    if (!user || !roadmap) {
      return res.status(404).json({
        statusCode: 404,
        message: errorMessages.errorProcessingThisRequest,
        body: {},
      });
    }

    const response = await CreateBookmark(userId, roadmapId);

    return res.status(201).json({
      statusCode: 201,
      message: sucessMessagesRoadmap.successUpdateRoadmap,
      body: { response },
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
