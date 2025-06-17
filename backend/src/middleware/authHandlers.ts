import { findGlobalUserSessionByUserId } from "@/db/utils/globalUser.db.utils";
import e, { type Request, type Response, type NextFunction } from "express";

// Middleware to check if the user is authenticated
export const isAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const sessionUser = await findGlobalUserSessionByUserId(
    // @ts-ignore
    req.user?.id as string
  );
  if (sessionUser?.valid) {
    return next();
  }
  res.status(401).json({
    message: "Unauthorized access. Please log in to continue.",
  });
};
