const RoadmapMessageErrors = require("../../constants/Roadmaps/errors");
const RoadmapMessageSuccesses = require("../../constants/Roadmaps/successes");

const { GetAllRoadmaps } = require("../../models/Roadmap");

const getAllRoadmaps = async (req, res) => {
  const { title, description, name, nickname } = req.query;

  try {
    const data = await GetAllRoadmaps();

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

module.exports = getAllRoadmaps;
