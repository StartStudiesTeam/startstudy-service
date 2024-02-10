const prisma = require("../database/prisma");

const createUser = async (data) => {
  await prisma.users.create({
    data: data,
  });
};

const updateUser = async (where, data) => {
  await prisma.users.update({
    where,
    data,
  });
};

const deleteUser = async (where) => {
  const del = await prisma.users.delete({
    where,
  });
};

const findUserMail = async (email) => {
  const find = await prisma.users.findFirst({
    where: {
      email,
    },
  });
  return find;
};

const findUserNick = async (nick) => {
  const find = await prisma.users.findFirst({
    where: {
      nickName: nick,
    },
  });
  return find;
};

const findDeletedFieldUser = async (id) => {
  const find = await prisma.users.findFirst({
    where: {
      id,
      deletedAt: null,
    },
  });
  return find;
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

module.exports = {
  createUser,
  updateUser,
  deleteUser,
  findUserMail,
  findUserNick,
  findDeletedFieldUser,
  updateNewPassword,
};
