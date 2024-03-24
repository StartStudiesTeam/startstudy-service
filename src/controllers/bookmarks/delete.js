const errorMessages = require("../../constants/codeMessages/errorMessages");
const sucessMessagesRoadmap = require("../../constants/codeMessages/roadmapSucessMessages");
const { currentTime } = require("../../utils/date/date");
const { DeleteBookmark, GetBookmarkById } = require("../../models/Bookmark");

const deleteBookmark = async (req, res) => {
  const { id } = req.body;

  try {
    const findbookmark = await GetBookmarkById(id);

    if (!findbookmark) {
      return res.status(400).json({
        statusCode: 400,
        message: "Este salvo não foi encontrado ou já foi removido!",
        body: {},
      });
    }

    const response = await DeleteBookmark(id, currentTime);

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
