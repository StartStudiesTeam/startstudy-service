const prisma = require("../database/prisma");

const getRoadmap = async (id) => {
  const roadmap = await prisma.roadmap.findFirst({
    where: {
      id,
    },
  });
  return roadmap;
};

module.exports = getRoadmap;
