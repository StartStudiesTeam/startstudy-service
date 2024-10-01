const prisma = require("../../database/prisma");

const GetBookmarkById = async (id) => {
  const bookmark = await prisma.bookmarks.findFirst({
    where: {
      id,
      deletedAt: null,
    },
  });
  return bookmark;
};

const CreateBookmark = async (userId, roadmapId) => {
  const bookmark = await prisma.bookmarks.create({
    data: {
      userId,
      roadmapId,
      bookmarks: true,
    },
  });

  const { updatedAt, deletedAt: _, ...response } = bookmark;

  return response;
};

const CheckUserAndRoadmapBookmarkFields = async (userId, roadmapId) => {
  const bookmark = await prisma.bookmarks.findFirst({
    where: {
      userId,
      roadmapId,
    },
  });

  return bookmark;
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

const DeletingMarked = async (id, time, value) => {
  const bookmark = prisma.bookmarks.update({
    where: {
      id,
    },
    data: {
      bookmarks: value,
      updatedAt: time,
    },
  });

  return bookmark;
};

module.exports = {
  GetBookmarkById,
  CheckUserAndRoadmapBookmarkFields,
  CreateBookmark,
  UpdateBookmark,
  DeleteBookmark,
  DeletingMarked,
};
