const errorMessages = require("../../helpers/codeMessages/errorMessages");
const sucessMessagesRoadmap = require("../../helpers/codeMessages/roadmapSucessMessages");
const { delBookmark, getBookmark } = require("../../models/Bookmark");

const deleteBookmark = async (req, res) => {
  const { id } = req.body;

  try {
    const bookmark = await getBookmark(id);

    if (!bookmark) {
      return res.status(404).json({
        statusCode: 404,
        message: errorMessages.errorProcessingThisRequest,
        body: {},
      });
    }

    const exclude = await delBookmark(id);

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
