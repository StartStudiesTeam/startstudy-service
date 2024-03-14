const errorMessages = require("../../constants/codeMessages/errorMessages");
const sucessMessagesRoadmap = require("../../constants/codeMessages/roadmapSucessMessages");
const { CreateRoadmap } = require("../../models/Roadmap");
const {
  GetUserByMail,
  GetUserByIdWithDeletedField,
} = require("../../models/User");

const createdRoadmap = async (req, res) => {
  const { email, title, description } = req.body;

  const user = await GetUserByMail(email);

  if (!user) {
    return res
      .status(404)
      .json({ statusCode: 404, message: errorMessages.invalidUser, body: {} });
  }

  const isDeletedUser = await GetUserByIdWithDeletedField(user.id);

  if (!isDeletedUser) {
    return res.status(400).json({
      statusCode: 400,
      message: errorMessages.errorProcessingThisRequest,
      body: {},
    });
  }

  try {
    const create = await CreateRoadmap(user.id, title, description);

    return res.status(201).json({
      statusCode: 201,
      message: sucessMessagesRoadmap.successfullyRegisteredRoadmap,
      body: { create },
    });
  } catch (error) {
    return res.status(400).json({
      statusCode: 400,
      message: errorMessages.errorProcessingThisRequest,
      body: {},
    });
  }
};

module.exports = createdRoadmap;
