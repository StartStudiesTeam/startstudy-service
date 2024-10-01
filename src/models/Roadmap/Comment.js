const prisma = require("../../database/prisma");

const GetCommentById = async (id) => {
  const comment = await prisma.comments.findFirst({
    where: {
      id,
      deletedAt: null,
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

const UpdateComment = async (id, comments, time) => {
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

const DeleteComment = async (id) => {
  const comment = await prisma.comments.update({
    where: {
      id,
    },
  });

  return comment;
};

module.exports = {
  GetCommentById,
  CreateComment,
  UpdateComment,
  DeleteComment,
};
