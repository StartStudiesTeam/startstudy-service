import { Request, Response, NextFunction } from "express";
import { userErros } from "../constants/Users/errors";
import { env } from "../env/index";
import jwt from "jsonwebtoken";

export const authenticationUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({
      statusCode: 401,
      message: userErros.unauthorizedUserError,
      body: {},
    });
  }

  try {
    const token = authorization.split(" ")[1];

    const { sub } = jwt.verify(token, env.JWT_SECRET);
    req.user = { id: sub as string };

    next();
  } catch (error) {
    return res.status(401).json({
      statusCode: 401,
      message: userErros.unauthorizedUserError,
      body: {},
    });
  }
};
