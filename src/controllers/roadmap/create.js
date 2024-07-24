const RoadmapMessageErrors = require("../../constants/Roadmaps/errors");
const RoadmapMessageSuccesses = require("../../constants/Roadmaps/successes");
const UserMessageErrors = require("../../constants/Users/errors");
const { CreateRoadmap } = require("../../models/Roadmap");
const {
  GetUserByMail,
  GetUserByIdWithDeletedField,
} = require("../../models/User");

const createdRoadmap = async (req, res) => {
  const { email, title, description } = req.body;

  const user = await GetUserByMail(email);

  if (!user) {
    return res.status(401).json({
      statusCode: 401,
      message: UserMessageErrors.invalidUserError,
      body: {},
    });
  }

  const isVerifiedAndActive = await GetUserByIdWithDeletedField(user.id);

  if (!isVerifiedAndActive) {
    return res.status(401).json({
      statusCode: 401,
      message: UserMessageErrors.errorEmailNotValidated,
      body: {},
    });
  }

  try {
    const data = await CreateRoadmap(user.id, title, description);

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
