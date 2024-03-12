const prisma = require("../database/prisma");

const GetTheMailAndCode = async (email, code) => {
  const request = await prisma.codeToken.findFirst({
    where: {
      codeToken: code,
      Users: {
        email,
      },
    },
  });

  return request;
};

const GetTheUserId = async (id) => {
  const request = await prisma.codeToken.findFirst({
    where: {
      userId: id,
    },
  });
  return request;
};

const GetFieldVerifyUserById = async (id) => {
  const request = await prisma.codeToken.findFirst({
    where: {
      id,
      NOT: {
        confirmationAt: null,
        updatedAt: null,
      },
    },
  });
  return request;
};

const UpdateCodeTokenById = async (id, code, date, value) => {
  const request = await prisma.codeToken.update({
    where: {
      id,
    },
    data: {
      codeToken: code,
      updatedAt: date,
      confirmationAt: value,
    },
  });
  return request;
};

const UpdateVerifiedField = async (id, time, verify) => {
  const request = await prisma.codeToken.update({
    where: {
      id,
    },
    data: {
      confirmationAt: time,
      updatedAt: time,
      Users: {
        update: {
          verifyMail: verify,
        },
      },
    },
  });
  const { deletedAt: _, ...response } = request;
  return response;
};

module.exports = {
  GetTheMailAndCode,
  GetTheUserId,
  GetFieldVerifyUserById,
  UpdateCodeTokenById,
  UpdateVerifiedField,
};
