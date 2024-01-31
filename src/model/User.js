const prisma = require("../database/prisma");

const createUser = async (data) => {
  await prisma.users.create({
    data: data,
  });
};

const readUser = async (data) => {
  await prisma.users.findUnique({
    where: data,
  });
};

const updateUser = async (where, data) => {
  await prisma.user.update({
    where,
    data,
  });
};

const deleteUser = async (where) => {
  const del = await prisma.users.delete({
    where,
  });
};

const findUserMail = async (data) => {
  const find = await prisma.users.findUnique({
    where: {
      email: data,
    },
  });
  return find;
};

const findUserNick = async (data) => {
  const find = await prisma.users.findUnique({
    where: {
      nick_name: data,
    },
  });
  return find;
};

module.exports = {
  createUser,
  readUser,
  updateUser,
  deleteUser,
  findUserMail,
  findUserNick,
};
