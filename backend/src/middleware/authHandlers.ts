import {
  findGlobalUserSessionById,
  findGlobalUserById,
} from "@/db/utils/globalUser.db.utils";
import e, { type Request, type Response, type NextFunction } from "express";

// Middleware to check if the user is authenticated
export const isAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const sessionId = req.cookies["authly.sid"];
  if (!sessionId) {
    res.status(401).json({ message: "No session" });
    return;
  }
  const sessionUser = await findGlobalUserSessionById(sessionId);
  if (sessionUser && sessionUser.valid) {
    const user = await findGlobalUserById(sessionUser.userId);
    if (user) {
      req.user = user;
      return next();
    }
  }
  res.status(401).json({ message: "Invalid session" });
};
