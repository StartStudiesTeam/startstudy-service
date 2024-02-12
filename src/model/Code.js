const prisma = require("../database/prisma");

const getMailAndCode = async (email, code) => {
  const find = await prisma.codeToken.findFirst({
    where: {
      codeToken: code,
      users: {
        email,
      },
    },
  });
  return find;
};

const getUserIDByID = async (id) => {
  const find = await prisma.codeToken.findFirst({
    where: {
      userId: id,
    },
  });
  return find;
};

const updateCodeTokenById = async (id, code, date, value) => {
  const update = await prisma.codeToken.update({
    where: {
      id,
    },
    data: {
      codeToken: code,
      updatedAt: date,
      confirmationAt: value,
    },
  });
  return update;
};
module.exports = {
  getMailAndCode,
  getUserIDByID,
  updateCodeTokenById,
};
