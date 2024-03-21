const prisma = require("../../src/database/prisma");

const GetTagById = async (id) => {
  const request = await prisma.tags.findFirst({
    where: {
      id,
    },
  });
  return request;
};

const CreateTag = async (roadmapId, tag) => {
  const request = await prisma.tags.create({
    data: {
      tag,
      roadmapId,
    },
  });

  const { updatedAt, deletedAt: _, ...response } = request;
  return response;
};

const UpdateTag = async (id, tag, time) => {
  const request = await prisma.tags.update({
    where: {
      id,
    },
    data: {
      tag,
      updatedAt: time,
    },
  });
  const { deletedAt: _, ...response } = request;
  return response;
};

const DeleteTag = async (id, time) => {
  const request = await prisma.tags.update({
    where: {
      id,
    },
    data: {
      deletedAt: time,
    },
  });

  return request;
};

const GetFieldDeleteByTagId = async (id) => {
  const request = await prisma.tags.findFirst({
    where: {
      id,
      deletedAt: null,
    },
  });
  return request;
};

module.exports = {
  GetTagById,
  CreateTag,
  UpdateTag,
  DeleteTag,
  GetFieldDeleteByTagId,
};
