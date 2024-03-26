const CommentMessageErrors = require("../../constants/CommentsComments/errors");
const CommentMessageSuccess = require("../../constants/CommentsComments/successes");
const { currentTime } = require("../../utils/date/date");
const {
  GetCommentCommentById,
  DelCommentsComments,
} = require("../../models/CommentComment");

const deleteCommentsComments = async (req, res) => {
  const { id } = req.body;

  try {
    const findComment = await GetCommentCommentById(id);

    if (!findComment) {
      return res.status(404).json({
        statusCode: 404,
        message: CommentMessageErrors.errorWhenDeletingCommentComment,
        body: {},
      });
    }

    const exclude = await DelCommentsComments(id, currentTime);

    return res.status(204).json({
      statusCode: 204,
      message: CommentMessageSuccess.successfulDeletingCommentComment,
      body: {},
    });
  } catch (error) {
    return res.status(400).json({
      statusCode: 400,
      message: CommentMessageErrors.errorWhenDeletingCommentComment,
      body: {},
    });
  }
};

module.exports = deleteCommentsComments;
