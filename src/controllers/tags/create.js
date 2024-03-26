const TagMessageErrors = require("../../constants/Tags/errors");
const TagMessageSuccess = require("../../constants/Tags/successes");
const RoadmapMessageErrors = require("../../constants/Roadmaps/errors");
const { GetRoadmapById } = require("../../models/Roadmap");
const { CreateTag } = require("../../models/Tags");

const createTag = async (req, res) => {
  const { roadmapId, tag } = req.body;

  try {
    const findRoadmap = await GetRoadmapById(roadmapId);

    if (!findRoadmap) {
      return res.status(404).json({
        statusCode: 404,
        message: RoadmapMessageErrors.errorReadRoadmap,
        body: {},
      });
    }

    const data = await CreateTag(roadmapId, tag);

    return res.status(201).json({
      statusCode: 201,
      message: TagMessageSuccess.successfulInRegisteringTag,
      body: { data },
    });
  } catch (error) {
    return res.status(400).json({
      statusCode: 400,
      message: TagMessageErrors.errorRegisteringTag,
      body: {},
    });
  }
};

module.exports = createTag;
