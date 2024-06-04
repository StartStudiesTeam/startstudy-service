const prisma = require("../database/prisma");

const GetRoadmapById = async (id) => {
  const roadmap = await prisma.roadmap.findFirst({
    where: {
      id,
      deletedAt: null,
    },
  });
  return roadmap;
};

const GetAllRoadmaps = async () => {
  const roadmaps = await prisma.roadmap.findMany({
    where: {
      deletedAt: null,
    },
    select: {
      id: true,
      title: true,
      description: true,
      createdAt: true,
      Users: {
        select: {
          id: true,
          name: true,
          email: true,
          nickName: true,
        },
      },
      VideosRoadmap: {
        where: {
          deletedAt: null,
        },
        select: {
          id: true,
          roadmapId: true,
          Videos: {
            select: {
              id: true,
              title: true,
              description: true,
              createdAt: true,
              video: true,
            },
          },
        },
      },
      Tags: {
        select: {
          id: true,
          tag: true,
        },
      },
      Comments: {
        select: {
          id: true,
          comments: true,
          Users: {
            select: {
              nickName: true,
              name: true,
            },
          },
        },
      },
      Bookmarks: {
        select: {
          id: true,
        },
      },
      _count: {
        select: {
          Likes: {
            where: {
              likes: true,
            },
          },
          Comments: {
            where: {
              deletedAt: null,
            },
          },
        },
      },
    },
  });
  return roadmaps;
};

const GetRoadmapByFilter = async ({ title, description, name, nickname }) => {
  const roadmap = await prisma.roadmap.findMany({
    where: {
      ...(title && { title: { contains: title, mode: "insensitive" } }),
      ...(description && {
        description: { contains: description, mode: "insensitive" },
      }),
      ...(name || nickname
        ? {
            Users: {
              ...(name && { name: { contains: name, mode: "insensitive" } }),
              ...(nickname && {
                nickName: { contains: nickname, mode: "insensitive" },
              }),
            },
          }
        : {}),
    },
    select: {
      id: true,
      title: true,
      description: true,
      createdAt: true,
      Users: {
        select: {
          id: true,
          name: true,
          email: true,
          nickName: true,
          createdAt: true,
        },
      },
    },
  });

  return roadmap;
};

const GetContentRoadmapById = async (roadmapId) => {
  const roadmap = await prisma.roadmap.findFirst({
    where: {
      id: roadmapId,
      deletedAt: null,
    },
    select: {
      id: true,
      title: true,
      description: true,
      createdAt: true,
      Users: {
        select: {
          id: true,
          name: true,
          email: true,
          nickName: true,
        },
      },
      VideosRoadmap: {
        where: {
          deletedAt: null,
        },
        select: {
          id: true,
          roadmapId: true,
          Videos: {
            select: {
              id: true,
              title: true,
              description: true,
              createdAt: true,
              video: true,
            },
          },
        },
      },
      Tags: {
        select: {
          id: true,
          tag: true,
        },
      },
      Comments: {
        select: {
          id: true,
          comments: true,
          Users: {
            select: {
              nickName: true,
              name: true,
            },
          },
        },
      },
      Bookmarks: {
        select: {
          id: true,
        },
      },
      _count: {
        select: {
          Likes: {
            where: {
              likes: true,
            },
          },
          Comments: {
            where: {
              deletedAt: null,
            },
          },
        },
      },
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
  GetRoadmapById,
  GetAllRoadmaps,
  GetRoadmapByFilter,
  GetContentRoadmapById,
  CreateRoadmap,
  UpdateRoadmap,
  DeletedRoadmapById,
};
