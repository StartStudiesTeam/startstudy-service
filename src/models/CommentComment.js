const prisma = require("../database/prisma");

const GetCommentCommentById = async (id) => {
  const comment = await prisma.commentsComments.findFirst({
    where: {
      id,
      deletedAt: null,
    },
  });
  return comment;
};

const CreateCommentComment = async (userId, commentsComments, commentsId) => {
  const comment = await prisma.commentsComments.create({
    data: {
      userId,
      commentsComments,
      commentsId,
    },
  });

  const { updatedAt, deletedAt: _, ...response } = comment;
  return response;
};

const UpdateCommentComment = async (id, commentsComments, time) => {
  const comment = await prisma.commentsComments.update({
    where: {
      id,
    },
    data: {
      commentsComments,
      updatedAt: time,
    },
  });

  const { deletedAt: _, ...response } = comment;
  return response;
};

const DelCommentsComments = async (id, time) => {
  const comment = await prisma.commentsComments.update({
    where: {
      id,
    },
    data: {
      deletedAt: time,
    },
  });

  return comment;
};

module.exports = {
  GetCommentCommentById,
  CreateCommentComment,
  UpdateCommentComment,
  DelCommentsComments,
};
