const BookmarkMessageErrors = require("../../constants/Bookmarks/errors");
const BookmarkMessageSuccesses = require("../../constants/Bookmarks/successes");
const {
  CreateBookmark,
  CheckUserAndRoadmapBookmarkFields,
  DeletingMarked,
} = require("../../models/Roadmap/Bookmark");
const { GetRoadmapById } = require("../../models/Roadmap/Roadmap");
const { GetFieldDeletedByUser } = require("../../models/User/User");
const { currentTime } = require("../../utils/date/date");

const createBookmark = async (req, res) => {
  const { userId, roadmapId } = req.body;

  try {
    const alreadySaved = await CheckUserAndRoadmapBookmarkFields(
      userId,
      roadmapId
    );

    if (alreadySaved) {
      await DeletingMarked(
        alreadySaved.id,
        currentTime,
        !alreadySaved.bookmarks
      );
      return res.status(204).send();
    }

    const [user, roadmap] = await Promise.all([
      GetFieldDeletedByUser(userId),
      GetRoadmapById(roadmapId),
    ]);

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
