const CommentMessageErrors = require("../../constants/Comments/errors");
const CommentMessageSuccess = require("../../constants/Comments/successes");
const {
  GetCommentById,
  DeleteComment,
} = require("../../models/Roadmap/Comment");

const deleteComments = async (req, res) => {
  const { id } = req.body;

  try {
    const findComment = await GetCommentById(id);

    if (!findComment) {
      return res.status(404).json({
        statusCode: 404,
        message: CommentMessageErrors.errorWhenDeletingComment,
        body: {},
      });
    }

    const exclude = await DeleteComment(id);

    return res.status(204).json({
      statusCode: 204,
      message: CommentMessageSuccess.successfulDeletingComment,
      body: {},
    });
  } catch (error) {
    return res.status(400).json({
      statusCode: 400,
      message: CommentMessageErrors.errorWhenDeletingComment,
      body: {},
    });
  }
};

module.exports = deleteComments;
