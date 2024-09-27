const RoadmapMessageErrors = require("../../constants/Roadmaps/errors");
const RoadmapMessageSuccesses = require("../../constants/Roadmaps/successes");
const {
  GetAllRoadmaps,
  GetRoadmapByFilter,
} = require("../../models/Roadmap/Roadmap");

const getAllRoadmaps = async (req, res) => {
  const { nick_name, skip, take } = req.query;

  try {
    const roadmaps = nick_name
      ? await GetRoadmapByFilter(nick_name, skip, take)
      : [];

    const allRoadmaps = await GetAllRoadmaps(skip, take);

    const hasRoadmaps = roadmaps.length > 0;

    const response = {
      statusCode: 200,
      message: hasRoadmaps
        ? RoadmapMessageSuccesses.successReadFilterRoadmap
        : RoadmapMessageSuccesses.successReadAllRoadmap,
      body: { data: hasRoadmaps ? roadmaps : allRoadmaps },
    };

    return res.status(200).json(response);
  } catch (error) {
    return res.status(400).json({
      statusCode: 400,
      message: RoadmapMessageErrors.errorReadRoadmap,
      body: {},
    });
  }
};

module.exports = getAllRoadmaps;
