const prisma = require("../database/prisma");

const GetComment = async (id) => {
  const comment = await prisma.comments.findFirst({
    where: {
      id,
    },
  });
  return comment;
};

const CreateComment = async (userId, comments, videoId, roadmapId) => {
  const comment = await prisma.comments.create({
    data: {
      userId,
      comments,
      videoId,
      roadmapId,
    },
  });

  const { updatedAt, deletedAt: _, ...response } = comment;
  return response;
};

const UpgradeComment = async (id, comments, time) => {
  const comment = await prisma.comments.update({
    where: {
      id,
    },
    data: {
      comments,
      updatedAt: time,
    },
  });

  const { deletedAt: _, ...response } = comment;
  return response;
};

const GetFieldDeleteByCommentId = async (id) => {
  const comment = await prisma.comments.findFirst({
    where: {
      id,
      deletedAt: null,
    },
  });
  return comment;
};

module.exports = {
  GetComment,
  CreateComment,
  UpgradeComment,
  GetFieldDeleteByCommentId,
};
