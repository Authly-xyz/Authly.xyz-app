import type { Response } from "express";

// create and send the session cookie
type sessionType = {
  userId: string;
  sessionId: string;
  valid: boolean;
  role: string[];
  permissions: string[];
};
export const createSessionCookie = (res: Response, session: sessionType) => {
  const cookie = {
    userId: session.userId,
    sessionId: session.sessionId,
    valid: session.valid,
    role: session.role,
    permissions: session.permissions,
  };
  res.cookie("authly.sid", cookie, {
    httpOnly: true,
    secure: Bun.env.NODE_ENV === "production",
    maxAge: 24 * 60 * 60 * 1000, // 1 day
    sameSite: "lax", // Prevent CSRF attacks
  });
};
