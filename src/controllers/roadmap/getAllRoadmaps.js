const RoadmapMessageErrors = require("../../constants/Roadmaps/errors");
const RoadmapMessageSuccesses = require("../../constants/Roadmaps/successes");

const { GetAllRoadmaps, GetRoadmapByFilter } = require("../../models/Roadmap");

const getAllRoadmaps = async (req, res) => {
  const { title, description, name, nickname } = req.query;

  try {
    const searchParams = { title, description, name, nickname };
    const hasSearchParams = Object.values(searchParams).some(
      (el) => el !== undefined
    );

    if (hasSearchParams) {
      const filters = Object.fromEntries(
        Object.entries(searchParams).filter(([_, value]) => value !== undefined)
      );

      const getRoadmapByFilter = await GetRoadmapByFilter(filters);

      if (getRoadmapByFilter.length > 0) {
        const roadmapsWithoutSensitiveData = getRoadmapByFilter.map(
          (roadmap) => ({
            ...roadmap,
            Users: {
              id: roadmap.Users.id,
              name: roadmap.Users.name,
              email: roadmap.Users.email,
              nickName: roadmap.Users.nickName,
              createdAt: roadmap.Users.createdAt,
            },
          })
        );

        return res.status(200).json({
          statusCode: 200,
          message: RoadmapMessageSuccesses.successReadRoadmap,
          body: { data: roadmapsWithoutSensitiveData },
        });
      }
    }
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
