const BookmarkMessageErrors = require("../../constants/Bookmarks/errors");
const BookmarkMessageSuccesses = require("../../constants/Bookmarks/successes");
const {
  CreateBookmark,
  CheckUserAndRoadmapBookmarkFields,
} = require("../../models/Roadmap/Bookmark");
const { GetRoadmapById } = require("../../models/Roadmap/Roadmap");
const { GetFieldDeletedByUser } = require("../../models/User/User");

const createBookmark = async (req, res) => {
  const { userId, roadmapId } = req.body;

  try {
    const [user, roadmap] = await Promise.all([
      GetFieldDeletedByUser(userId),
      GetRoadmapById(roadmapId),
    ]);

    const alreadySaved = await CheckUserAndRoadmapBookmarkFields(
      userId,
      roadmapId
    );

    if (!user || !roadmap || alreadySaved) {
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
