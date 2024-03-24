const prisma = require("../../database/prisma");
const sucessMessagesComments = require("../../constants/codeMessages/commentsSucessMessages");
const errorMessages = require("../../constants/codeMessages/errorMessages");
const { GetCommentById } = require("../../models/Comment");

const deleteComments = async (req, res) => {
  const { id } = req.body;

  try {
    const findComment = await GetCommentById(id);

    if (!findComment) {
      return res.status(404).json({
        statusCode: 404,
        message: errorMessages.errorProcessingThisRequest,
        body: {},
      });
    }

    const exclude = await prisma.$transaction(async () => {
      const exclude = await prisma.commentsComments.deleteMany({
        where: {
          commentsId: id,
        },
      });

      await prisma.comments.delete({
        where: {
          id,
        },
      });

      return exclude;
    });

    return res.status(204).json({
      statusCode: 204,
      message: sucessMessagesComments.deletedComments,
      body: {},
    });
  } catch (error) {
    return res.status(400).json({
      statusCode: 400,
      message: errorMessages.errorProcessingThisRequest,
      body: {},
    });
  }
};

module.exports = deleteComments;
