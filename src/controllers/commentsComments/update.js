const sucessMessagesComments = require("../../constants/codeMessages/commentsSucessMessages");
const errorMessages = require("../../constants/codeMessages/errorMessages");
const { currentTime } = require("../../utils/date/date");
const {
  GetCommentComment,
  UpgradeCommentComment,
  GetFieldDeleteByCommentCommentId,
} = require("../../models/CommentComment");

const updateCommentsComments = async (req, res) => {
  const { id, commentsComments } = req.body;

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

    const comment = await UpgradeCommentComment(
      id,
      commentsComments,
      currentTime
    );

    return res.status(200).json({
      statusCode: 200,
      message: sucessMessagesComments.successUpdateComments,
      body: { comment },
    });
  } catch (error) {
    return res.status(400).json({
      statusCode: 400,
      message: errorMessages.errorProcessingThisRequest,
      body: {},
    });
  }
};

module.exports = updateCommentsComments;
