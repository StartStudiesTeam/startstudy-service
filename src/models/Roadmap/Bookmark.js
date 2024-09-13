const prisma = require("../../database/prisma");

const GetBookmarkById = async (id) => {
  const request = await prisma.bookmarks.findFirst({
    where: {
      id,
      deletedAt: null,
    },
  });
  return request;
};

const CreateBookmark = async (userId, roadmapId) => {
  const request = await prisma.bookmarks.create({
    data: {
      userId,
      roadmapId,
    },
  });

  const { updatedAt, deletedAt: _, ...response } = request;

  return response;
};

const UpdateBookmark = async (id, roadmapId, time) => {
  const bookmark = await prisma.bookmarks.update({
    where: {
      id,
    },
    data: {
      roadmapId,
      updatedAt: time,
    },
  });

  const { deletedAt: _, ...response } = bookmark;

  return response;
};

const DeleteBookmark = async (id, time) => {
  const bookmark = await prisma.bookmarks.update({
    where: {
      id,
    },
    data: {
      deletedAt: time,
    },
  });

  return bookmark;
};
module.exports = {
  GetBookmarkById,
  CreateBookmark,
  UpdateBookmark,
  DeleteBookmark,
};
