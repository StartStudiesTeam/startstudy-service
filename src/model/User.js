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

const findUserMail = async (email) => {
  const find = await prisma.users.findUnique({
    where: {
      email,
    },
  });
  return find;
};

const findUserNick = async (nick) => {
  const find = await prisma.users.findUnique({
    where: {
      nick_name: nick,
    },
  });
  return find;
};

const findDeletedFieldUser = async (id) => {
  const find = await prisma.users.findFirst({
    where: {
      id,
      deleted_at: null,
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
      updated_at: date,
    },
  });
  return update;
};

module.exports = {
  createUser,
  readUser,
  updateUser,
  deleteUser,
  findUserMail,
  findUserNick,
  findDeletedFieldUser,
  updateNewPassword,
};
