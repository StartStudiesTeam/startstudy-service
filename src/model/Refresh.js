const dayjs = require("dayjs");
const prisma = require("../database/prisma");

const expiresIn = dayjs().add(15, "second").unix();

const createRefresh = async (usersId) => {
  const refresh = await prisma.refreshToken.create({
    data: {
      usersId,
      expiresIn,
    },
  });
  return refresh;
};

const validRefresh = async (refresh_token) => {
  const refresh = await prisma.refreshToken.findFirst({
    where: {
      id: refresh_token,
    },
  });
  console.log(refresh);
  return refresh;
};

const deleteRefresh = async (refresh_token) => {
  const delRefresh = await prisma.refreshToken.deleteMany({
    where: {
      usersId: refresh_token.usersId,
    },
  });
  return delRefresh;
};

module.exports = {
  createRefresh,
  validRefresh,
  deleteRefresh,
};
