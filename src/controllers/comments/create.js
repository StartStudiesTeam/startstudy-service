const sucessMessagesComments = require("../../helpers/codeMessages/commentsSucessMessages");
const errorMessages = require("../../helpers/codeMessages/errorMessages");
const { postComment } = require("../../models/Comment");
const { findUserMail } = require("../../models/User");

const createComments = async (req, res) => {
  const { email, comments, videoId, roadmapId } = req.body;

  try {
    const user = await findUserMail(email);
    const create = await postComment(user.id, comments, videoId, roadmapId);

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

module.exports = createComments;
