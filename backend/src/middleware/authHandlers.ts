import {
  findGlobalUserSessionByUserId,
  findGlobalUserById,
} from "@/db/utils/globalUser.db.utils";
import e, { type Request, type Response, type NextFunction } from "express";

// Middleware to check if the user is authenticated
export const isAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const session = req.cookies["authly.sid"];
  if (!session) {
    res.status(401).json({ message: "No session" });
    return;
  }
  const sessionUser = await findGlobalUserSessionByUserId(session);
  if (sessionUser && sessionUser.valid) {
    const user = await findGlobalUserById(sessionUser.userId);
    if (user) {
      req.user = user;
      return next();
    }
  }
  res.status(401).json({ message: "Invalid session" });
};
