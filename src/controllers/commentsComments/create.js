const prisma = require("../../database/prisma");
const sucessMessagesComments = require("../../helpers/codeMessages/commentsSucessMessages");
const errorMessages = require("../../helpers/codeMessages/errorMessages");
const { findUserMail } = require("../../models/User");

const createCommentsComments = async (req, res) => {
  const { email, commentsComments, commentsId } = req.body;

  const user = await findUserMail(email);

  try {
    const create = await prisma.comments_comments.create({
      data: {
        Users: {
          connect: {
            id: user.id,
          },
        },
        commentsComments,
        commentsId,
      },
    });

    const { updatedAt, deletedAt: _, ...createdCommentsComments } = create;

    return res.status(201).json({
      message: sucessMessagesComments.successfullyRegisteredComments,
      body: { createdCommentsComments },
    });
  } catch (error) {
    return res
      .status(400)
      .json({ message: errorMessages.errorProcessingThisRequest });
  }
};

module.exports = createCommentsComments;
