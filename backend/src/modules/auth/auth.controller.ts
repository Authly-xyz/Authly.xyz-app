import { destroyGlobalUserSession } from "@/db/utils/globalUser.db.utils";
import { type Request, type Response } from "express";

// logout controller
export const logoutController = async (req: Request, res: Response) => {
  // @ts-ignore
  await destroyGlobalUserSession(req.user?.sessionId as string);
  // @ts-ignore
  console.log("session destroyed for user:", req.user?.sessionId);
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ message: "Logout failed", error: err });
    }
    res.clearCookie("authly.sid"); // Clear the session cookie
    res.status(200).json({ message: "Logout successful" });
  });
};
