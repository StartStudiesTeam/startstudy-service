const RoadmapMessageErrors = require("../../constants/Roadmaps/errors");
const RoadmapMessageSuccesses = require("../../constants/Roadmaps/successes");
const { GetRoadmapById, DeletedRoadmapById } = require("../../models/Roadmap");
const { currentTime } = require("../../utils/date/date");

const deleteRoadmap = async (req, res) => {
  const { roadmapId } = req.body;

  try {
    const findRoadmap = await GetRoadmapById(roadmapId);

    if (!findRoadmap) {
      return res.status(404).json({
        statusCode: 404,
        message: RoadmapMessageErrors.errorDeletingRoadmap,
        body: {},
      });
    }

    const data = await DeletedRoadmapById(roadmapId, currentTime);

    return res.status(204).json({
      statusCode: 204,
      message: RoadmapMessageSuccesses.successfulDeletingRoadmap,
      body: {},
    });
  } catch (error) {
    return res.status(400).json({
      statusCode: 400,
      message: RoadmapMessageErrors.errorDeletingRoadmap,
      body: {},
    });
  }
};

module.exports = deleteRoadmap;
