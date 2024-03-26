const BookmarkMessageErrors = require("../../constants/Bookmarks/errors");
const BookmarkMessageSuccesses = require("../../constants/Bookmarks/successes");
const { currentTime } = require("../../utils/date/date");
const { DeleteBookmark, GetBookmarkById } = require("../../models/Bookmark");

const deleteBookmark = async (req, res) => {
  const { id } = req.body;

  try {
    const findbookmark = await GetBookmarkById(id);

    if (!findbookmark) {
      return res.status(404).json({
        statusCode: 404,
        message: BookmarkMessageErrors.errorBookmarkDeletedOrNotFound,
        body: {},
      });
    }

    const data = await DeleteBookmark(id, currentTime);

    return res.status(204).json({
      statusCode: 204,
      message: BookmarkMessageSuccesses.successWhenDeletingBookmark,
      body: {},
    });
  } catch (error) {
    return res.status(400).json({
      statusCode: 400,
      message: BookmarkMessageErrors.errorWhenDeletingBookmark,
      body: {},
    });
  }
};

module.exports = deleteBookmark;
