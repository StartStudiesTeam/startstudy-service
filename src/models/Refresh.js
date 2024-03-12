const dayjs = require("dayjs");
const prisma = require("../database/prisma");

const CreateRefresh = async (usersId) => {
  const expiresIn = dayjs().add(15, "second").unix();

  const refresh = await prisma.refreshToken.create({
    data: {
      usersId,
      expiresIn,
    },
  });
  return refresh;
};

const GetRefresh = async (ref) => {
  const refresh = await prisma.refreshToken.findFirst({
    where: {
      id: ref,
    },
  });
  return refresh;
};

const DeleteRefresh = async (refresh_token) => {
  const delRefresh = await prisma.refreshToken.deleteMany({
    where: {
      usersId: refresh_token.usersId,
    },
  });
  return delRefresh;
};

module.exports = {
  CreateRefresh,
  GetRefresh,
  DeleteRefresh,
};
