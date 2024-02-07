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

const updatedCodeTokenField = async (id, date) => {
  const update = await prisma.codeToken.update({
    where: {
      userId: id,
    },
    data: {
      confirmation_at: date,
      updatedAt: date,
    },
  });
  return update;
};

module.exports = {
  getMailAndCode,
  updatedCodeTokenField,
};
