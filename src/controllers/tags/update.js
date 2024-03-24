const errorMessages = require("../../constants/codeMessages/errorMessages");
const sucessMessagesRoadmap = require("../../constants/codeMessages/roadmapSucessMessages");
const { GetRoadmapById } = require("../../models/Roadmap");
const { UpdateTag, GetTagById } = require("../../models/Tags");
const { currentTime } = require("../../utils/date/date");

const updateTag = async (req, res) => {
  const { id, roadmapId, tag } = req.body;

  try {
    const isTagDeleted = await GetTagById(id);
    const isDeletedRoadmap = await GetRoadmapById(roadmapId);

    if (!isDeletedRoadmap || !isTagDeleted) {
      return res.status(404).json({
        statusCode: 404,
        message: errorMessages.errorProcessingThisRequest,
        body: {},
      });
    }

    const response = await UpdateTag(id, tag, currentTime);

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

module.exports = updateTag;
