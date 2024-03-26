const CommentMessageErrors = require("../../constants/CommentsComments/errors");
const CommentMessageSuccess = require("../../constants/CommentsComments/successes");
const { currentTime } = require("../../utils/date/date");
const {
  GetCommentCommentById,
  UpdateCommentComment,
} = require("../../models/CommentComment");

const updateCommentsComments = async (req, res) => {
  const { id, commentsComments } = req.body;

  try {
    const findComment = await GetCommentCommentById(id);

    if (!findComment) {
      return res.status(404).json({
        statusCode: 404,
        message: CommentMessageErrors.errorWhenUpdatingCommentComment,
        body: {},
      });
    }

    const data = await UpdateCommentComment(id, commentsComments, currentTime);

    return res.status(200).json({
      statusCode: 200,
      message: CommentMessageSuccess.successUpdatingCommentComment,
      body: { data },
    });
  } catch (error) {
    return res.status(400).json({
      statusCode: 400,
      message: CommentMessageErrors.errorWhenUpdatingCommentComment,
      body: {},
    });
  }
};

module.exports = updateCommentsComments;
