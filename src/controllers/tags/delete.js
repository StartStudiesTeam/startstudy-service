const errorMessages = require("../../constants/codeMessages/errorMessages");
const sucessMessagesRoadmap = require("../../constants/codeMessages/roadmapSucessMessages");
const { GetTag, DeleteTag } = require("../../models/Tags");

const deleteTag = async (req, res) => {
  const { id } = req.body;

  try {
    const findTag = await GetTag(id);

    if (!findTag) {
      return res.status(404).json({
        statusCode: 404,
        message: errorMessages.errorProcessingThisRequest,
        body: {},
      });
    }

    const request = await DeleteTag(id);

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
