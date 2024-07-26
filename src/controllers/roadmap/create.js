const RoadmapMessageErrors = require("../../constants/Roadmaps/errors");
const RoadmapMessageSuccesses = require("../../constants/Roadmaps/successes");
const UserMessageErrors = require("../../constants/Users/errors");
const { CreateRoadmap } = require("../../models/Roadmap");
const { GetUserByIdWithDeletedField } = require("../../models/User");

const createdRoadmap = async (req, res) => {
  const { userId, title, description } = req.body;

  try {
    const isVerifiedAndActive = await GetUserByIdWithDeletedField(userId);

    if (!isVerifiedAndActive) {
      return res.status(401).json({
        statusCode: 401,
        message: UserMessageErrors.errorEmailNotValidated,
        body: {},
      });
    }

    const data = await CreateRoadmap(userId, title, description);

    return res.status(201).json({
      statusCode: 201,
      message: RoadmapMessageSuccesses.successfulInRegisteringRoadmap,
      body: { data },
    });
  } catch (error) {
    return res.status(400).json({
      statusCode: 400,
      message: RoadmapMessageErrors.errorRegisteringRoadmap,
      body: {},
    });
  }
};

module.exports = createdRoadmap;
