const errorMessages = require("../../constants/codeMessages/errorMessages");
const sucessMessagesRoadmap = require("../../constants/codeMessages/roadmapSucessMessages");
const {
  GetRoadmap,
  DeletedRoadmapById,
  GetFieldDeletedByRoadmapId,
} = require("../../models/Roadmap");

const deleteRoadmap = async (req, res) => {
  const { id } = req.body;

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
        message: "Não foi possível deletar o Roadmap",
        body: {},
      });
    }

    const exclude = await DeletedRoadmapById(id);

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
