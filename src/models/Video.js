const prisma = require("../database/prisma");

const GetVideoById = async (id) => {
  const response = await prisma.videos.findFirst({
    where: {
      id,
      deletedAt: null,
    },
  });
  return response;
};

const UpdateFieldVideosRoadmap = async (id, time) => {
  const response = await prisma.videosRoadmap.updateMany({
    where: {
      videoId: id,
    },
    data: {
      updatedAt: time,
    },
  });
  return response;
};

const UpdateAllVideoData = async (id, title, desc, midia, amountLike, time) => {
  const request = await prisma.videos.update({
    where: {
      id,
    },
    data: {
      title,
      description: desc,
      video: midia,
      amountLike,
      updatedAt: time,
    },
  });

  const { deletedAt: _, ...response } = request;
  return response;
};

module.exports = {
  GetVideoById,
  UpdateFieldVideosRoadmap,
  UpdateAllVideoData,
};
