const prisma = require("../../database/prisma");
const errorMessages = require("../../helpers/codeMessages/errorMessages");
const sucessMessagesRoadmap = require("../../helpers/codeMessages/roadmapSucessMessages");
const { findUserMail } = require("../../models/User");

const createComments = async (req, res) => {
  const { email, comments, videoId, roadmapId } = req.body;

  const user = await findUserMail(email);

  try {
    if (videoId) {
      const create = await prisma.comments.create({
        data: {
          user: {
            connect: {
              id: user.id,
            },
          },
          comments,
          videoId,
        },
      });

      const { updatedAt, deletedAt: _, ...createdComments } = create;
    }

    if (roadmapId) {
      const create = await prisma.comments.create({
        data: {
          user: {
            connect: {
              id: user.id,
            },
          },
          comments,
          roadmapId,
        },
      });

      const { updatedAt, deletedAt: _, ...createdComments } = create;
    }

    return res.status(201).json({
      message: sucessMessagesRoadmap.successfullyRegisteredRoadmap,
      body: { createdComments },
    });
  } catch (error) {
    return res
      .status(400)
      .json({ message: errorMessages.errorProcessingThisRequest });
  }
};

module.exports = createComments;
