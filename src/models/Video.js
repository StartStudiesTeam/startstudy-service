const prisma = require("../database/prisma");

const getVideo = async (id) => {
  const video = await prisma.videos.findFirst({
    where: {
      id,
    },
  });
  return video;
};

const upgradeVideo = async (id, title, desc, midia, amountLike, time) => {
  const video = await prisma.videos.update({
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

  const { deletedAt: _, ...response } = video;
  return response;
};

module.exports = {
  getVideo,
  upgradeVideo,
};
