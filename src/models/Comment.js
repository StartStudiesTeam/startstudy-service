const prisma = require("../database/prisma");

const getComment = async (id) => {
  const comment = await prisma.comments.findFirst({
    where: {
      id,
    },
  });
  return comment;
};

const postComment = async (id, comments, videoId, roadmapId) => {
  const comment = await prisma.comments.create({
    data: {
      Users: {
        connect: {
          id,
        },
      },
      comments,
      ...(videoId ? { videoId } : { roadmapId }),
    },
  });

  const { updatedAt, deletedAt: _, ...response } = comment;
  return response;
};

const upgradeComment = async (id, comments, time) => {
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

module.exports = {
  getComment,
  postComment,
  upgradeComment,
};
