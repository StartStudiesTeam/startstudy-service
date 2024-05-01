const RoadmapMessageErrors = require("../../constants/Roadmaps/errors");
const RoadmapMessageSuccesses = require("../../constants/Roadmaps/successes");
const {
  GetRoadmapById,
  GetContentRoadmapById,
} = require("../../models/Roadmap");

const readRoadmap = async (req, res) => {
  const { roadmapId } = req.body;

  try {
    const findRoadmap = await GetRoadmapById(roadmapId);

    if (!findRoadmap) {
      return res.status(404).json({
        statusCode: 404,
        message: RoadmapMessageErrors.errorReadRoadmap,
        body: {},
      });
    }

    const data = await GetContentRoadmapById(roadmapId);

    return res.status(200).json({
      statusCode: 200,
      message: RoadmapMessageSuccesses.successReadRoadmap,
      body: { data },
    });
  } catch (error) {
    return res.status(400).json({
      statusCode: 400,
      message: RoadmapMessageErrors.errorReadRoadmap,
      body: {},
    });
  }
};

module.exports = readRoadmap;
