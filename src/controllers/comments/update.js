const CommentMessageErrors = require("../../constants/Comments/errors");
const CommentMessageSuccess = require("../../constants/Comments/successes");
const { currentTime } = require("../../utils/date/date");
const { UpgradeComment, GetCommentById } = require("../../models/Comment");

const updateComments = async (req, res) => {
  const { id, comments } = req.body;

  try {
    const findComment = await GetCommentById(id);

    if (!findComment) {
      return res.status(404).json({
        statusCode: 404,
        message: CommentMessageErrors.errorWhenUpdatingComment,
        body: {},
      });
    }

    const data = await UpgradeComment(id, comments, currentTime);

    return res.status(200).json({
      statusCode: 200,
      message: CommentMessageSuccess.successUpdatingComment,
      body: { data },
    });
  } catch (error) {
    return res.status(400).json({
      statusCode: 400,
      message: CommentMessageErrors.errorWhenUpdatingComment,
      body: {},
    });
  }
};

module.exports = updateComments;
