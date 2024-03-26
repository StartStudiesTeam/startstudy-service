const BookmarkMessageErrors = require("../../constants/Bookmarks/errors");
const BookmarkMessageSuccesses = require("../../constants/Bookmarks/successes");
const { CreateBookmark } = require("../../models/Bookmark");
const { GetRoadmapById } = require("../../models/Roadmap");
const { GetFieldDeletedByUser } = require("../../models/User");

const createBookmark = async (req, res) => {
  const { userId, roadmapId } = req.body;

  try {
    const user = await GetFieldDeletedByUser(userId);
    const roadmap = await GetRoadmapById(roadmapId);

    if (!user || !roadmap) {
      return res.status(400).json({
        statusCode: 400,
        message: BookmarkMessageErrors.errorRegisteringBookmark,
        body: {},
      });
    }

    const data = await CreateBookmark(userId, roadmapId);

    return res.status(201).json({
      statusCode: 201,
      message: BookmarkMessageSuccesses.successfulRegisteringBookmark,
      body: { data },
    });
  } catch (error) {
    return res.status(400).json({
      statusCode: 400,
      message: BookmarkMessageErrors.errorRegisteringBookmark,
      body: {},
    });
  }
};

module.exports = createBookmark;
