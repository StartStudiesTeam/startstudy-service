const prisma = require("../database/prisma");

const getCommentComment = async (id) => {
  const comment = await prisma.commentsComments.findFirst({
    where: {
      id,
    },
  });
  return comment;
};

const postCommentComment = async (id, commentsComments, commentsId) => {
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

const upgradeCommentComment = async (id, commentsComments, time) => {
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

const delCommentsComments = async (id) => {
  const comment = await prisma.commentsComments.delete({
    where: {
      id,
    },
  });

  return comment;
};

module.exports = {
  getCommentComment,
  postCommentComment,
  upgradeCommentComment,
  delCommentsComments,
};
