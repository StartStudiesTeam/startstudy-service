import { prisma } from "../../database/prisma";

export const GetTheMailAndCode = async (email: string, code: string) => {
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

export const GetTheUserId = async (id: string) => {
  const request = await prisma.codeToken.findFirst({
    where: {
      userId: id,
    },
  });
  return request;
};

export const GetConfirmationFieldByTokenUserId = async (id: string) => {
  const request = await prisma.codeToken.findFirst({
    where: {
      id,
      confirmationAt: null,
    },
  });
  return request;
};

export const UpdateCodeTokenById = async (
  id: string,
  code: string,
  date: Date,
  value: Date
) => {
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

export const UpdateVerifiedField = async (
  id: string,
  time: Date,
  verify: boolean
) => {
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
