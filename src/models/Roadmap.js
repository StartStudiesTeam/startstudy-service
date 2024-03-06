const prisma = require("../database/prisma");

const getRoadmap = async (id) => {
  const roadmap = await prisma.roadmap.findFirst({
    where: {
      id,
    },
  });
  return roadmap;
};

const postRoadmap = async (id, title, description) => {
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
  const { updatedAt, deletedAt: _, ...response } = create;
  return response;
};

const upgradeRoadmap = async (id, title, description, time) => {
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
  const { updatedAt, deletedAt: _, ...response } = roadmap;
  return response;
};

const delRoadmap = async (id) => {
  const roadmap = await prisma.roadmap.delete({
    where: {
      id,
    },
  });
  return roadmap;
};

module.exports = {
  getRoadmap,
  postRoadmap,
  upgradeRoadmap,
  delRoadmap,
};
