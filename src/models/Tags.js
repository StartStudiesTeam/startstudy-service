const prisma = require("../../src/database/prisma");

const GetTag = async (id) => {
  const tags = await prisma.tags.findFirst({
    where: {
      id,
    },
  });

  return tags;
};

const CreateTag = async (userId, roadmapId, tag) => {
  const tags = await prisma.tags.create({
    data: {
      tag,
      userId,
      roadmapId,
    },
  });

  const { updatedAt, deletedAt: _, ...response } = tags;
  return response;
};

const UpdateTag = async (id, roadmapId, userId, tag, time) => {
  const tags = await prisma.tags.update({
    where: {
      id,
    },
    data: {
      roadmapId,
      userId,
      tag,
      updatedAt: time,
    },
  });
  const { deletedAt: _, ...response } = tags;
  return response;
};

const DeleteTag = async (id) => {
  const tags = await prisma.tags.delete({
    where: {
      id,
    },
  });

  return tags;
};

module.exports = {
  GetTag,
  CreateTag,
  UpdateTag,
  DeleteTag,
};
