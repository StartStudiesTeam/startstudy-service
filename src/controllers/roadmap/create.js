const errorMessages = require("../../constants/codeMessages/errorMessages");
const sucessMessagesRoadmap = require("../../constants/codeMessages/roadmapSucessMessages");
const { postRoadmap } = require("../../models/Roadmap");
const { findUserMail } = require("../../models/User");

const createdRoadmap = async (req, res) => {
  const { email, title, description } = req.body;

  const user = await findUserMail(email);

  try {
    const create = await postRoadmap(user.id, title, description);

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
