const errorMessages = require("../../constants/codeMessages/errorMessages");
const sucessMessagesRoadmap = require("../../constants/codeMessages/roadmapSucessMessages");
const { currentTime } = require("../../utils/date/date");
const { UpdateBookmark, GetBookmarkById } = require("../../models/Bookmark");
const { GetRoadmapById } = require("../../models/Roadmap");

const updateBookmark = async (req, res) => {
  const { id, roadmapId } = req.body;

  try {
    const findbookmark = await GetBookmarkById(id);
    const findRoadmap = await GetRoadmapById(roadmapId);

    if (!findbookmark || !findRoadmap) {
      return res.status(400).json({
        statusCode: 400,
        message: errorMessages.errorProcessingThisRequest,
        body: {},
      });
    }

    const response = await UpdateBookmark(id, roadmapId, currentTime);

    return res.status(200).json({
      statusCode: 200,
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

module.exports = updateBookmark;
