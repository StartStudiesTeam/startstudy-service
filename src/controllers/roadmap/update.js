const errorMessages = require("../../constants/codeMessages/errorMessages");
const sucessMessagesRoadmap = require("../../constants/codeMessages/roadmapSucessMessages");
const { currentTime } = require("../..//utils/date/date");
const {
  GetRoadmap,
  UpdateRoadmap,
  GetFieldDeletedByRoadmapId,
} = require("../../models/Roadmap");

const updateRoadmap = async (req, res) => {
  const { id, title, description } = req.body;

  try {
    const findRoadmap = await GetRoadmap(id);

    if (!findRoadmap) {
      return res.status(404).json({
        statusCode: 404,
        message: errorMessages.errorProcessingThisRequest,
        body: {},
      });
    }

    const isDeletedField = await GetFieldDeletedByRoadmapId(id);

    if (!isDeletedField) {
      return res.status(400).json({
        statusCode: 400,
        message: "Não foi possível atualizar o Roadmap",
        body: {},
      });
    }

    const roadmap = await UpdateRoadmap(id, title, description, currentTime);

    return res.status(200).json({
      statusCode: 200,
      message: sucessMessagesRoadmap.successUpdateRoadmap,
      body: { roadmap },
    });
  } catch (error) {
    return res.status(400).json({
      statusCode: 400,
      message: errorMessages.errorProcessingThisRequest,
      body: {},
    });
  }
};

module.exports = updateRoadmap;
