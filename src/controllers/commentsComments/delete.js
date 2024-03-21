const sucessMessagesComments = require("../../constants/codeMessages/commentsSucessMessages");
const errorMessages = require("../../constants/codeMessages/errorMessages");

const deleteCommentsComments = async (req, res) => {
  const { id } = req.body;

  try {
    const commentCommentDelete = await GetFieldDeleteByCommentCommentId(id);
    const findComment = await GetCommentComment(id);

    if (!findComment || !commentCommentDelete) {
      return res.status(404).json({
        statusCode: 404,
        message: errorMessages.errorProcessingThisRequest,
        body: {},
      });
    }

    const exclude = await DeleteCommentsComments(id);

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

module.exports = deleteCommentsComments;
