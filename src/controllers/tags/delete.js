const errorMessages = require("../../constants/codeMessages/errorMessages");
const sucessMessagesRoadmap = require("../../constants/codeMessages/roadmapSucessMessages");
const { DeleteTag, GetTagById } = require("../../models/Tags");
const { currentTime } = require("../../utils/date/date");

const deleteTag = async (req, res) => {
  const { id } = req.body;

  try {
    const isTagDeleted = await GetTagById(id);

    if (!isTagDeleted) {
      return res.status(400).json({
        statusCode: 400,
        message: errorMessages.errorProcessingThisRequest,
        body: {},
      });
    }

    const response = await DeleteTag(id, currentTime);

    return res.status(204).json({
      statusCode: 204,
      message: sucessMessagesRoadmap.successUpdateRoadmap,
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

module.exports = deleteTag;
