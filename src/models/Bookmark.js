const prisma = require("../database/prisma");

const getBookmark = async (id) => {
  const bookmark = await prisma.bookmarks.findFirst({
    where: {
      id,
    },
  });
  return bookmark;
};

const postBookmark = async (userId, videoId, roadmapId) => {
  const bookmark = await prisma.bookmarks.create({
    data: {
      userId,
      videoId,
      roadmapId,
    },
  });

  const { updatedAt, deletedAt: _, ...response } = bookmark;

  return response;
};

const updateBookmark = async (id, userId, videoId, roadmapId, time) => {
  const bookmark = await prisma.bookmarks.update({
    where: {
      id,
    },
    data: {
      userId,
      videoId,
      roadmapId,
      updatedAt: time,
    },
  });

  const { deletedAt: _, ...response } = bookmark;

  return response;
};

const delBookmark = async (id) => {
  const bookmark = await prisma.bookmarks.delete({
    where: {
      id,
    },
  });

  return bookmark;
};
module.exports = {
  getBookmark,
  postBookmark,
  updateBookmark,
  delBookmark,
};
