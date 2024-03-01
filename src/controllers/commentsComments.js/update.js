const prisma = require("../../database/prisma");
const sucessMessagesComments = require("../../helpers/codeMessages/commentsSucessMessages");
const errorMessages = require("../../helpers/codeMessages/errorMessages");
const { currentTime } = require("../../helpers/helpersData/date");

const updateCommentsComments = async (req, res) => {
  const { id, commentsComments } = req.body;

  try {
    const comments = await prisma.comments_comments.update({
      where: {
        id,
      },
      data: {
        commentsComments,
        updatedAt: currentTime,
      },
    });

    const { updatedAt, deletedAt: _, ...updatedCommentsComments } = comments;

    return res.status(200).json({
      message: sucessMessagesComments.successUpdateComments,
      body: { updatedCommentsComments },
    });
  } catch (error) {
    return res
      .status(400)
      .json({ message: errorMessages.errorProcessingThisRequest });
  }
};

module.exports = updateCommentsComments;
