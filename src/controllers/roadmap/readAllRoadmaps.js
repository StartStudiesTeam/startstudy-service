const RoadmapMessageErrors = require("../../constants/Roadmaps/errors");
const RoadmapMessageSuccesses = require("../../constants/Roadmaps/successes");
const {
  GetAllRoadmaps,
  GetRoadmapByFilter,
} = require("../../models/Roadmap/Roadmap");

const readAllRoadmaps = async (req, res) => {
  const { nick_name, title, skip, take } = req.query;

  const fetchRoadmaps = async () => {
    const filteredRoadmaps =
      nick_name || title ? await GetRoadmapByFilter(nick_name, title) : [];

    return filteredRoadmaps.length
      ? filteredRoadmaps
      : await GetAllRoadmaps(skip, take);
  };

  try {
    const roadmaps = await fetchRoadmaps();

    return res.status(200).json({
      statusCode: 200,
      message: RoadmapMessageSuccesses.successReadAllRoadmap,
      body: { data: roadmaps },
    });
  } catch (error) {
    return res.status(400).json({
      statusCode: 400,
      message: RoadmapMessageErrors.errorReadRoadmap,
      body: {},
    });
  }
};

module.exports = readAllRoadmaps;
