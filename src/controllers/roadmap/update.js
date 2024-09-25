const RoadmapMessageErrors = require("../../constants/Roadmaps/errors");
const RoadmapMessageSuccesses = require("../../constants/Roadmaps/successes");
const { currentTime } = require("../..//utils/date/date");
const {
  GetRoadmapById,
  UpdateRoadmap,
} = require("../../models/Roadmap/Roadmap");

const updateRoadmap = async (req, res) => {
  const { roadmapId, title, description } = req.body;

  try {
    const findRoadmap = await GetRoadmapById(roadmapId);

    if (!findRoadmap) {
      return res.status(404).json({
        statusCode: 404,
        message: RoadmapMessageErrors.errorUpdatingRoadmap,
        body: {},
      });
    }

    const data = await UpdateRoadmap(
      roadmapId,
      title,
      description,
      currentTime
    );

    return res.status(200).json({
      statusCode: 200,
      message: RoadmapMessageSuccesses.successUpdatingRoadmap,
      body: { data },
    });
  } catch (error) {
    return res.status(400).json({
      statusCode: 400,
      message: RoadmapMessageErrors.errorUpdatingRoadmap,
      body: {},
    });
  }
};

module.exports = updateRoadmap;
