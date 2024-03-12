const sucessMessagesComments = require("../../constants/codeMessages/commentsSucessMessages");
const errorMessages = require("../../constants/codeMessages/errorMessages");
const { postCommentComment } = require("../../models/CommentComment");
const { GetUserByMail } = require("../../models/User");

const createCommentsComments = async (req, res) => {
  const { email, commentsComments, commentsId } = req.body;

  try {
    const user = await GetUserByMail(email);

    const create = postCommentComment(user.id, commentsComments, commentsId);

    return res.status(201).json({
      statusCode: 201,
      message: sucessMessagesComments.successfullyRegisteredComments,
      body: { create },
    });
  } catch (error) {
    return res.status(400).json({
      statusCode: 400,
      message: errorMessages.errorProcessingThisRequest,
      body: {},
    });
  }
};

module.exports = createCommentsComments;
