const errorMessages = require("../../helpers/codeMessages/errorMessages");
const sucessMessagesRoadmap = require("../../helpers/codeMessages/roadmapSucessMessages");
const { currentTime } = require("../../helpers/helpersData/date");
const { getBookmark } = require("../../models/Bookmark");

const updateBookmark = async (req, res) => {
  const { id, userId, videoId, roadmapId } = req.body;

  try {
    const bookmark = await getBookmark(id);

    if (!bookmark) {
      return res.status(404).json({
        statusCode: 404,
        message: errorMessages.errorProcessingThisRequest,
        body: {},
      });
    }

    const update = updateBookmark(id, userId, videoId, roadmapId, currentTime);

    return res.status(200).json({
      statusCode: 200,
      message: sucessMessagesRoadmap.successUpdateRoadmap,
      body: { update },
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
