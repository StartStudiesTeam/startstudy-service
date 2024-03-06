const prisma = require("../database/prisma");

const getLike = async (id) => {
  const like = await prisma.likes.findFirst({
    where: {
      id,
    },
  });
  return like;
};

const postLike = async (userId, videoId, roadmapId) => {
  const like = await prisma.likes.create({
    data: {
      userId,
      videoId,
      roadmapId,
    },
  });

  const { updatedAt, deletedAt: _, ...response } = like;
  return response;
};

const upgradeLike = async (id, userId, videoId, roadmapId, time) => {
  const like = await prisma.likes.update({
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

  const { deletedAt: _, ...response } = like;

  return response;
};

const delLike = async (id) => {
  const like = await prisma.likes.delete({
    where: {
      id,
    },
  });

  return like;
};

module.exports = {
  getLike,
  postLike,
  upgradeLike,
  delLike,
};
