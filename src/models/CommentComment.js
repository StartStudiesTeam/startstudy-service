const prisma = require("../database/prisma");

const GetCommentComment = async (id) => {
  const comment = await prisma.commentsComments.findFirst({
    where: {
      id,
    },
  });
  return comment;
};

const GetFieldDeleteByCommentCommentId = async (id) => {
  const comment = await prisma.commentsComments.findFirst({
    where: {
      id,
      deletedAt: null,
    },
  });
  return comment;
};

const CreateCommentComment = async (id, commentsComments, commentsId) => {
  const comment = await prisma.commentsComments.create({
    data: {
      Users: {
        connect: {
          id,
        },
      },
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
  GetCommentComment,
  GetFieldDeleteByCommentCommentId,
  CreateCommentComment,
  UpdateCommentComment,
  DelCommentsComments,
};
