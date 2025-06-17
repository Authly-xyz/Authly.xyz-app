import { destroyGlobalUserSession } from "@/db/utils/globalUser.db.utils";
import { type Request, type Response } from "express";

// logout controller
export const logoutController = async (req: Request, res: Response) => {
  const sessionId = req.cookies["authly.sid"];
  if (sessionId) {
    console.log("Logging out user with session:", sessionId);
    await destroyGlobalUserSession(sessionId);
    res.clearCookie("authly.sid");
    res.status(200).json({ message: "Logout successful" });
  } else {
    res.status(400).json({ message: "No session found" });
  }
};
