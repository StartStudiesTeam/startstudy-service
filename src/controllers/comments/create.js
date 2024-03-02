const prisma = require("../../database/prisma");
const sucessMessagesComments = require("../../helpers/codeMessages/commentsSucessMessages");
const errorMessages = require("../../helpers/codeMessages/errorMessages");
const { findUserMail } = require("../../models/User");

const createComments = async (req, res) => {
  const { email, comments, videoId, roadmapId } = req.body;

  const user = await findUserMail(email);

  try {
    const create = await prisma.comments.create({
      data: {
        Users: {
          connect: {
            id: user.id,
          },
        },
        comments,
        ...(videoId ? { videoId } : { roadmapId }),
      },
    });

    const { updatedAt, deletedAt: _, ...createdComments } = create;
    return res.status(201).json({
      message: sucessMessagesComments.successfullyRegisteredComments,
      body: { createdComments },
    });
  } catch (error) {
    return res
      .status(400)
      .json({ message: errorMessages.errorProcessingThisRequest });
  }
};

module.exports = createComments;
