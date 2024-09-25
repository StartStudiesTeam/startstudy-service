const TagMessageErrors = require("../../constants/Tags/errors");
const TagMessageSuccess = require("../../constants/Tags/successes");
const { DeleteTag, GetTagById } = require("../../models/Roadmap/Tags");
const { currentTime } = require("../../utils/date/date");

const deleteTag = async (req, res) => {
  const { id } = req.body;

  try {
    const isTagDeleted = await GetTagById(id);

    if (!isTagDeleted) {
      return res.status(400).json({
        statusCode: 400,
        message: TagMessageErrors.errorDeletingTag,
        body: {},
      });
    }

    const response = await DeleteTag(id, currentTime);

    return res.status(204).json({
      statusCode: 204,
      message: TagMessageSuccess.successfulDeletingTag,
      body: {},
    });
  } catch (error) {
    return res.status(400).json({
      statusCode: 400,
      message: TagMessageErrors.errorDeletingTag,
      body: {},
    });
  }
};

module.exports = deleteTag;
