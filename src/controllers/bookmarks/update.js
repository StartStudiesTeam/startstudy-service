const BookmarkMessageErrors = require("../../constants/Bookmarks/errors");
const BookmarkMessageSuccesses = require("../../constants/Bookmarks/successes");
const { currentTime } = require("../../utils/date/date");
const {
  UpdateBookmark,
  GetBookmarkById,
} = require("../../models/Roadmap/Bookmark");
const { GetRoadmapById } = require("../../models/Roadmap/Roadmap");

const updateBookmark = async (req, res) => {
  const { id, roadmapId } = req.body;

  try {
    const [findBookmark, findRoadmap] = await Promise.all([
      GetBookmarkById(id),
      GetRoadmapById(roadmapId),
    ]);

    if (!findBookmark || !findRoadmap) {
      return res.status(404).json({
        statusCode: 404,
        message: BookmarkMessageErrors.errorBookmarkDeletedOrNotFound,
        body: {},
      });
    }

    const data = await UpdateBookmark(id, roadmapId, currentTime);

    return res.status(200).json({
      statusCode: 200,
      message: BookmarkMessageSuccesses.successfulUpdatingBookmark,
      body: { data },
    });
  } catch (error) {
    return res.status(400).json({
      statusCode: 400,
      message: BookmarkMessageErrors.errorWhenUpdatingBookmark,
      body: {},
    });
  }
};

module.exports = updateBookmark;
