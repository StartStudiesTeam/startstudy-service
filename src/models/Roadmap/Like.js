const prisma = require("../../database/prisma");

const GetLikeById = async (id) => {
  const like = await prisma.likes.findFirst({
    where: {
      id,
      deletedAt: null,
    },
  });
  return like;
};

const CheckUserAndVideoLikeFields = async (userId, videoId, roadmapId) => {
  const request = await prisma.likes.findFirst({
    where: {
      userId: userId,
      videoId,
      roadmapId,
      deletedAt: null,
    },
  });

  return request;
};

const CreateLike = async (userId, videoId, roadmapId) => {
  const like = await prisma.likes.create({
    data: {
      userId,
      videoId,
      roadmapId,
      likes: true,
    },
  });

  const { updatedAt, deletedAt: _, ...response } = like;
  return response;
};

const UpdateLike = async (id, userId, time) => {
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

const DeletingLike = async (likeId, time, status) => {
  const like = await prisma.likes.update({
    where: {
      id: likeId,
    },
    data: {
      updatedAt: time,
      likes: status,
    },
  });
  return like;
};

const DeleteLike = async (id, time) => {
  const like = await prisma.likes.update({
    where: {
      id,
    },
    data: {
      updatedAt: time,
      deletedAt: time,
      likes: false,
    },
  });

  return like;
};

module.exports = {
  GetLikeById,
  CheckUserAndVideoLikeFields,
  CreateLike,
  UpdateLike,
  DeletingLike,
  DeleteLike,
};
