import dayjs from "dayjs";
import { prisma } from "../../database/prisma";

export const CreateRefresh = async (usersId: string) => {
  const expiresIn = dayjs().add(15, "second").unix();

  const refresh = await prisma.refreshToken.create({
    data: {
      usersId,
      expiresIn,
    },
  });
  return refresh;
};

export const GetRefresh = async (ref: string) => {
  const refresh = await prisma.refreshToken.findFirst({
    where: {
      id: ref,
    },
  });
  return refresh;
};

export const DeleteRefresh = async (refresh_token: string) => {
  const delRefresh = await prisma.refreshToken.deleteMany({
    where: {
      usersId: refresh_token,
    },
  });
  return delRefresh;
};
