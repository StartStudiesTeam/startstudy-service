const sucessMessagesComments = require("../../constants/codeMessages/commentsSucessMessages");
const errorMessages = require("../../constants/codeMessages/errorMessages");
const { currentTime } = require("../../utils/date/date");
const { UpgradeComment, GetCommentById } = require("../../models/Comment");

const updateComments = async (req, res) => {
  const { id, comments } = req.body;

  try {
    const findComment = await GetCommentById(id);

    if (!findComment) {
      return res.status(404).json({
        statusCode: 404,
        message: errorMessages.errorProcessingThisRequest,
        body: {},
      });
    }

    const comment = await UpgradeComment(id, comments, currentTime);

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

module.exports = updateComments;
