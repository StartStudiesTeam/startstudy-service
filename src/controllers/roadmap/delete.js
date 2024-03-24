const errorMessages = require("../../constants/codeMessages/errorMessages");
const sucessMessagesRoadmap = require("../../constants/codeMessages/roadmapSucessMessages");
const { GetRoadmapById, DeletedRoadmapById } = require("../../models/Roadmap");
const { currentTime } = require("../../utils/date/date");

const deleteRoadmap = async (req, res) => {
  const { id } = req.body;

  try {
    const findRoadmap = await GetRoadmapById(id);

    if (!findRoadmap) {
      return res.status(404).json({
        statusCode: 404,
        message: errorMessages.errorProcessingThisRequest,
        body: {},
      });
    }

    const excludeRoadmap = await DeletedRoadmapById(id, currentTime);

    return res.status(204).json({
      statusCode: 204,
      message: sucessMessagesRoadmap.deletedRoadmap,
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

module.exports = deleteRoadmap;
