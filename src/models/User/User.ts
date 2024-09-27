import { prisma } from "../../database/prisma";

export const GetUserByMail = async (email: string) => {
  const request = await prisma.users.findFirst({
    where: {
      email,
    },
  });
  return request;
};

export const GetUserByNick = async (nick: string) => {
  const request = await prisma.users.findFirst({
    where: {
      nickName: nick,
    },
  });
  return request;
};

export const GetUserByIdWithDeletedField = async (id: string) => {
  const request = await prisma.users.findFirst({
    where: {
      id,
      deletedAt: null,
      verifyMail: true,
    },
  });

  return request;
};

export const GetFieldDeletedByUser = async (id: string) => {
  const find = await prisma.users.findFirst({
    where: {
      id,
      deletedAt: null,
    },
  });
  return find;
};

export const UpdateMainUserData = async (
  id: string,
  name: string,
  email: string,
  phoneNumber: string,
  time: Date
) => {
  const request = await prisma.users.update({
    where: {
      id,
    },
    data: {
      name,
      email,
      phoneNumber,
      updatedAt: time,
      verifyMail: false,
    },
  });
  const { deletedAt, password: _, ...response } = request;
  return response;
};

export const UpdateNewPassword = async (
  email: string,
  password: string,
  date: Date
) => {
  const update = prisma.users.update({
    where: {
      email,
    },
    data: {
      password,
      updatedAt: date,
      verifyMail: false,
    },
  });
  return update;
};

export const DeleteUserById = async (id: string, time: Date) => {
  const response = await prisma.users.update({
    where: {
      id,
    },
    data: {
      deletedAt: time,
    },
  });
  return response;
};
