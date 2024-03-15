const prisma = require("../database/prisma");

const GetRoadmap = async (id) => {
  const roadmap = await prisma.roadmap.findFirst({
    where: {
      id,
    },
  });
  return roadmap;
};

const GetFieldDeletedByRoadmapId = async (id) => {
  const roadmap = await prisma.roadmap.findFirst({
    where: {
      id,
      deletedAt: null,
    },
  });
  return roadmap;
};

const CreateRoadmap = async (id, title, description) => {
  const roadmap = await prisma.roadmap.create({
    data: {
      Users: {
        connect: {
          id,
        },
      },
      title,
      description,
    },
  });
  const { updatedAt, deletedAt: _, ...response } = roadmap;
  return response;
};

const UpdateRoadmap = async (id, title, description, time) => {
  const roadmap = await prisma.roadmap.update({
    where: {
      id,
    },
    data: {
      title,
      description,
      updatedAt: time,
    },
  });
  const { deletedAt: _, ...response } = roadmap;
  return response;
};

const DeletedRoadmapById = async (id, time) => {
  const roadmap = await prisma.roadmap.update({
    where: {
      id,
    },
    data: {
      deletedAt: time,
    },
  });
  return roadmap;
};

module.exports = {
  GetRoadmap,
  GetFieldDeletedByRoadmapId,
  CreateRoadmap,
  UpdateRoadmap,
  DeletedRoadmapById,
};
