const prisma = require("../database/prisma");

const GetLike = async (id) => {
  const like = await prisma.likes.findFirst({
    where: {
      id,
    },
  });
  return like;
};

const CreateLike = async (
  userId,
  videoId,
  roadmapId,
  commentsId,
  commentsCommentsId
) => {
  const like = await prisma.likes.create({
    data: {
      userId,
      videoId,
      roadmapId,
      commentsId,
      commentsCommentsId,
      likes: true,
    },
  });

  const { updatedAt, deletedAt: _, ...response } = like;
  return response;
};

const UpgradeLike = async (id, userId, time) => {
  const like = await prisma.likes.update({
    where: {
      id,
    },
    data: {
      userId,
      updatedAt: time,
    },
  });

  const { deletedAt: _, ...response } = like;

  return response;
};

const DeleteLike = async (id, time) => {
  const like = await prisma.likes.update({
    where: {
      id,
      data: {
        deletedAt: time,
      },
    },
  });

  return like;
};

const CountLike = async (
  videoId,
  roadmapId,
  commentsId,
  commentsCommentsId
) => {
  const where = {};
  if (videoId) where.videoId = videoId;
  if (roadmapId) where.roadmapId = roadmapId;
  if (commentsId) where.commentsId = commentsId;
  if (commentsCommentsId) where.commentsCommentsId = commentsCommentsId;
  const like = await prisma.likes.count({
    where,
  });
  return like;
};

const GetFieldDeleteByLikeId = async (id) => {
  const like = await prisma.likes.findFirst({
    where: {
      id,
      deletedAt: null,
    },
  });
  return like;
};

module.exports = {
  GetLike,
  CreateLike,
  UpgradeLike,
  DeleteLike,
  CountLike,
  GetFieldDeleteByLikeId,
};
