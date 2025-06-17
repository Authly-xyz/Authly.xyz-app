import type { Response } from "express";

// create and send the session cookie
export const createSessionCookie = (res: Response, sessionId: string) => {
  res.cookie("authly.sid", sessionId, {
    httpOnly: true,
    secure: Bun.env.NODE_ENV === "production",
    maxAge: 24 * 60 * 60 * 1000, // 1 day
    sameSite: "lax", // Prevent CSRF attacks
  });
};
