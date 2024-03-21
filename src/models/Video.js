const prisma = require("../database/prisma");

const GetVideo = async (id) => {
  const response = await prisma.videos.findFirst({
    where: {
      id,
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

const GetFieldDeleteByVideoId = async (id) => {
  const response = await prisma.videos.findFirst({
    where: {
      id,
      deletedAt: null,
    },
  });
  return response;
};

module.exports = {
  GetVideo,
  UpdateFieldVideosRoadmap,
  UpdateAllVideoData,
  GetFieldDeleteByVideoId,
};
