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

const GetContentRelatedVideo = async (videoId) => {
  const video = await prisma.videos.findFirst({
    where: {
      id: videoId,
      deletedAt: null,
    },
    select: {
      id: true,
      title: true,
      description: true,
      video: true,
      createdAt: true,
      Comments: {
        select: {
          id: true,
          Users: {
            select: {
              id: true,
              name: true,
              email: true,
              nickName: true,
            },
          },
          comments: true,
        },
      },
      _count: {
        select: {
          Comments: true,
          Likes: true,
        },
      },
    },
  });

  return video;
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
  GetContentRelatedVideo,
  UpdateFieldVideosRoadmap,
  UpdateAllVideoData,
};
