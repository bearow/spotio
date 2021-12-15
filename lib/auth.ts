import jwt from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "./prisma";

export const validateRoute = (handler) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const token = req.cookies.TRAX_ACCESS_TOKEN;

    let user;
    if (!token) {
      res.status(401);
      res.json({ error: "Missing token" });
    }
    try {
      const { id } = jwt.verify(token, "s3cr3t");
      user = await prisma.user.findUnique({
        where: { id },
      });

      if (!user) {
        throw new Error("Not a user");
      }
    } catch (e) {
      res.status(401);
      return res.json({ error: "Not Authorized" });
    }
    return handler(req, res, user);
  };
};

export const validateToken = async (token) => {
  const { id } = jwt.verify(token, "s3cr3t");
  return id;
};
