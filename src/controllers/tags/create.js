const errorMessages = require("../../constants/codeMessages/errorMessages");
const sucessMessagesRoadmap = require("../../constants/codeMessages/roadmapSucessMessages");
const { GetRoadmap } = require("../../models/Roadmap");
const { CreateTag } = require("../../models/Tags");

const createTag = async (req, res) => {
  const { userId, roadmapId, tag } = req.body;

  try {
    const findRoadmap = await GetRoadmap(roadmapId);

    if (!findRoadmap) {
      return res.status(404).json({
        statusCode: 404,
        message: errorMessages.errorProcessingThisRequest,
        body: {},
      });
    }

    const request = await CreateTag(roadmapId, tag);

    return res.status(201).json({
      statusCode: 201,
      message: sucessMessagesRoadmap.successUpdateRoadmap,
      body: { request },
    });
  } catch (error) {
    return res.status(400).json({
      statusCode: 400,
      message: errorMessages.errorProcessingThisRequest,
      body: {},
    });
  }
};

module.exports = createTag;
