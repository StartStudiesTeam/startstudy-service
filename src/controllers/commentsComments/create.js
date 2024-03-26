const CommentMessageErrors = require("../../constants/CommentsComments/errors");
const CommentMessageSuccess = require("../../constants/CommentsComments/successes");
const { CreateCommentComment } = require("../../models/CommentComment");
const { GetUserByMail } = require("../../models/User");

const createCommentsComments = async (req, res) => {
  const { email, commentsComments, commentsId } = req.body;

  try {
    const user = await GetUserByMail(email);

    const data = await CreateCommentComment(
      user.id,
      commentsComments,
      commentsId
    );

    return res.status(201).json({
      statusCode: 201,
      message: CommentMessageSuccess.successfulInRegisteringCommentComment,
      body: { data },
    });
  } catch (error) {
    return res.status(400).json({
      statusCode: 400,
      message: CommentMessageErrors.errorRegisteringCommentComment,
      body: {},
    });
  }
};

module.exports = createCommentsComments;
