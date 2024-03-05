const sucessMessagesComments = require("../../helpers/codeMessages/commentsSucessMessages");
const errorMessages = require("../../helpers/codeMessages/errorMessages");
const { currentTime } = require("../../helpers/helpersData/date");
const { upgradeComment } = require("../../models/Comment");

const updateComments = async (req, res) => {
  const { id, comments } = req.body;

  try {
    const comment = await upgradeComment(id, comments, currentTime);

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
