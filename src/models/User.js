const prisma = require("../database/prisma");

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

module.exports = {
  findUserMail,
  findUserNick,
  findDeletedFieldUser,
  upgradeUser,
  updateNewPassword,
};
