const prisma = require("../database/prisma");

const GetUserByMail = async (email) => {
  const request = await prisma.users.findFirst({
    where: {
      email,
    },
  });
  return request;
};

const GetUserByNick = async (nick) => {
  const request = await prisma.users.findFirst({
    where: {
      nickName: nick,
    },
  });
  return request;
};

const GetUserByIdWithDeletedField = async (id) => {
  const request = await prisma.users.findFirst({
    where: {
      id,
      deletedAt: null,
    },
  });

  return request;
};

const GetFieldDeletedByUser = async (id) => {
  const find = await prisma.users.findFirst({
    where: {
      id,
      deletedAt: null,
    },
  });
  return find;
};

const upgradeUser = async (id, name, email, phoneNumber, time) => {
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

const updateNewPassword = async (email, password, date) => {
  const update = prisma.users.update({
    where: {
      email,
    },
    data: {
      password,
      updatedAt: date,
    },
  });
  return update;
};

const DeleteUserById = async (id, time) => {
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

module.exports = {
  GetUserByMail,
  GetUserByNick,
  GetUserByIdWithDeletedField,
  GetFieldDeletedByUser,
  upgradeUser,
  updateNewPassword,
  DeleteUserById,
};
