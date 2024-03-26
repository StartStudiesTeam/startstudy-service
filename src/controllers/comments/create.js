const CommentMessageErrors = require("../../constants/Comments/errors");
const CommentMessageSuccess = require("../../constants/Comments/successes");
const { CreateComment } = require("../../models/Comment");
const { GetUserByMail } = require("../../models/User");

const createComments = async (req, res) => {
  const { email, comments, videoId, roadmapId } = req.body;

  try {
    const user = await GetUserByMail(email);
    const data = await CreateComment(user.id, comments, videoId, roadmapId);

    return res.status(201).json({
      statusCode: 201,
      message: CommentMessageSuccess.successfulInRegisteringComment,
      body: { data },
    });
  } catch (error) {
    return res.status(400).json({
      statusCode: 400,
      message: CommentMessageErrors.errorRegisteringComment,
      body: {},
    });
  }
};

module.exports = createComments;
