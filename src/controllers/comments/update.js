const prisma = require("../../database/prisma");
const sucessMessagesComments = require("../../helpers/codeMessages/commentsSucessMessages");
const errorMessages = require("../../helpers/codeMessages/errorMessages");
const { currentTime } = require("../../helpers/helpersData/date");

const updateComments = async (req, res) => {
  const { id, comments } = req.body;

  try {
    const comments = await prisma.comments.update({
      where: {
        id,
      },
      data: {
        comments,
        updatedAt: currentTime,
      },
    });

    const { deletedAt: _, ...updatedComments } = comments;

    return res.status(200).json({
      statusCode: 200,
      message: sucessMessagesComments.successUpdateComments,
      body: { updatedComments },
    });
  } catch (error) {
    return res.status(400).json({
      statusCode: 400,
      message: errorMessages.errorProcessingThisRequest,
      body: {},
    });
  }
};

module.exports = updateComments;
