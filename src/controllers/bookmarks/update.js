const errorMessages = require("../../constants/codeMessages/errorMessages");
const sucessMessagesRoadmap = require("../../constants/codeMessages/roadmapSucessMessages");
const { currentTime } = require("../../utils/date/date");
const {
  UpdateBookmark,
  GetBookmarkByIdWithDeletedField,
} = require("../../models/Bookmark");
const { GetFieldDeletedByUser } = require("../../models/User");
const { GetFieldDeletedByRoadmapId } = require("../../models/Roadmap");

const updateBookmark = async (req, res) => {
  const { id, roadmapId, userId } = req.body;

  try {
    const bookmark = await GetBookmarkByIdWithDeletedField(id);
    const roadmap = await GetFieldDeletedByRoadmapId(roadmapId);
    const user = await GetFieldDeletedByUser(userId);

    if (!user || !bookmark || !roadmap) {
      return res.status(400).json({
        statusCode: 400,
        message: errorMessages.errorProcessingThisRequest,
        body: {},
      });
    }

    const response = await UpdateBookmark(id, roadmapId, currentTime);

    return res.status(200).json({
      statusCode: 200,
      message: sucessMessagesRoadmap.successUpdateRoadmap,
      body: { response },
    });
  } catch (error) {
    return res.status(400).json({
      statusCode: 400,
      message: errorMessages.errorProcessingThisRequest,
      body: {},
    });
  }
};

module.exports = updateBookmark;
