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

const CreateVideo = async (id, title, description, video, roadmapId) => {
  const videos = await prisma.videos.create({
    data: {
      Users: {
        connect: {
          id,
        },
      },
      title,
      description,
      video,
    },
  });

  const videoId = videos.id;

  await prisma.videosRoadmap.create({
    data: {
      roadmapId,
      videoId,
    },
  });

  const { updatedAt, deletedAt, amount_like: _, ...response } = videos;
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

const UpdateAllVideoData = async (id, title, desc, midia, time) => {
  const request = await prisma.videos.update({
    where: {
      id,
    },
    data: {
      title,
      description: desc,
      video: midia,
      updatedAt: time,
    },
  });

  const { deletedAt: _, ...response } = request;
  return response;
};

const DeleteVideo = async (id, time) => {
  const request = await prisma.videosRoadmap.updateMany({
    where: {
      videoId: id,
    },
    data: {
      deletedAt: time,
    },
  });

  await prisma.videos.update({
    where: {
      id,
    },
    data: {
      deletedAt: time,
    },
  });

  return request;
};

module.exports = {
  GetVideoById,
  CreateVideo,
  GetContentRelatedVideo,
  UpdateFieldVideosRoadmap,
  UpdateAllVideoData,
  DeleteVideo,
};
