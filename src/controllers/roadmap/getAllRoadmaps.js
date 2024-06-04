const RoadmapMessageErrors = require("../../constants/Roadmaps/errors");
const RoadmapMessageSuccesses = require("../../constants/Roadmaps/successes");
const { GetAllRoadmaps, GetRoadmapByFilter } = require("../../models/Roadmap");
const filterSearchParams = require("../../utils/roadmap/filterSearchParams");

const getAllRoadmaps = async (req, res) => {
  try {
    const searchParams = filterSearchParams({
      title: req.query.title,
      description: req.query.description,
      name: req.query.name,
      nickname: req.query.nickname,
    });

    const roadmaps = await GetRoadmapByFilter(searchParams);

    if (roadmaps.length > 0) {
      return res.status(200).json({
        statusCode: 200,
        message: RoadmapMessageSuccesses.successReadRoadmap,
        body: { data: roadmaps },
      });
    }

    const allRoadmaps = await GetAllRoadmaps();

    return res.status(200).json({
      statusCode: 200,
      message: RoadmapMessageSuccesses.successReadRoadmap,
      body: { data: allRoadmaps },
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
