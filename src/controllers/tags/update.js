const errorMessages = require("../../constants/codeMessages/errorMessages");
const sucessMessagesRoadmap = require("../../constants/codeMessages/roadmapSucessMessages");
const { getRoadmap } = require("../../models/Roadmap");
const { UpdateTag } = require("../../models/Tags");
const { currentTime } = require("../../utils/date/date");

const updateTag = async (req, res) => {
  const { id, userId, roadmapId, tag } = req.body;

  try {
    const findRoadmap = await getRoadmap(roadmapId);

    if (!findRoadmap) {
      return res.status(404).json({
        statusCode: 404,
        message: errorMessages.errorProcessingThisRequest,
        body: {},
      });
    }

    const request = await UpdateTag(id, roadmapId, userId, tag, currentTime);

    return res.status(200).json({
      statusCode: 200,
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

module.exports = updateTag;
