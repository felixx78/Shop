import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { User } from "../types/user";

interface CustomRequest extends Request {
  user?: User;
}

export const requireAdmin = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ message: "Authorization token is missing" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as User;

    if (decoded.role !== "admin") {
      return res
        .status(403)
        .json({ message: "Access forbidden. Admins only." });
    }

    req.user = decoded;
    next();
  } catch (e) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

export const requireAuth = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ message: "Authorization token is missing" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as User;

    req.user = decoded;
    next();
  } catch (e) {
    return res.status(401).json({ message: "Invalid token" });
  }
};
