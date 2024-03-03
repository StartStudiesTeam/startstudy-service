const prisma = require("../../database/prisma");
const errorMessages = require("../../helpers/codeMessages/errorMessages");
const sucessMessagesRoadmap = require("../../helpers/codeMessages/roadmapSucessMessages");
const { findUserMail } = require("../../models/User");

const createdRoadmap = async (req, res) => {
  const { email, title, description } = req.body;

  const user = await findUserMail(email);

  try {
    const create = await prisma.roadmap.create({
      data: {
        Users: {
          connect: {
            id: user.id,
          },
        },
        title,
        description,
      },
    });

    const { updatedAt, deletedAt: _, ...createdRoadmap } = create;

    return res.status(201).json({
      statusCode: 201,
      message: sucessMessagesRoadmap.successfullyRegisteredRoadmap,
      body: { createdRoadmap },
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
