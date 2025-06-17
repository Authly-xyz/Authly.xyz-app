import type { Request, Response } from "express";
import { eq } from "drizzle-orm";
import { db } from "../index";

import { globalUsersTable } from "../schema/globalUsers";
import { globalUserSessionTable } from "../schema/globalUserSession";
import { createSessionCookie } from "../../utils/session";
import { isArray } from "util";

// find user by email
export const findGlobalUserByEmail = async (email: string) => {
  try {
    const user = await db
      .select()
      .from(globalUsersTable)
      .where(eq(globalUsersTable.email, email));
    return user[0];
  } catch (error) {
    console.error("Error finding user by email:", error);
    return null;
  }
};

// find user by id
export const findGlobalUserById = async (id: string) => {
  try {
    const user = await db
      .select()
      .from(globalUsersTable)
      .where(eq(globalUsersTable.id, id));
    return user[0];
  } catch (error) {
    console.error("Error finding user by id:", error);
    return null;
  }
};

// create a new user
export const createGlobalUser = async (userData: {
  email: string;
  name: string;
  emailVerified?: boolean;
  authProvider: "email" | "google" | "github" | "facebook" | "twitter";
  providerId: string;
  profilePicture: string | undefined | null;
}) => {
  try {
    const user = await db.insert(globalUsersTable).values(userData).returning();
    return user[0];
  } catch (error) {
    console.error("Error creating user:", error);
    return null;
  }
};

// create global user session
export const createGlobalUserSession = async (
  userId: string,
  req: Request,
  res: Response
) => {
  try {
    // TODO: use Redis for caching sessions
    // Check if the user exists
    const user = await findGlobalUserById(userId);
    if (!user) {
      console.error("User not found");
      return null;
    }
    const session = await db
      .insert(globalUserSessionTable)
      .values({
        userId: userId,
        valid: true,
        userAgent: req.headers["user-agent"] || "unknown",
        ipAddress: req.ip || "0.0.0.0",
      })
      .returning();
    // Create session cookie
    createSessionCookie(res, {
      userId: user.id,
      sessionId: session[0].id,
      valid: session[0].valid,
      role: Array.isArray(user.role)
        ? (user.role as string[])
        : [user.role as string],
      permissions: user.permissions || ["read", "write"], // Default permissions if not set
    });
    return session[0];
  } catch (error) {
    console.error("Error creating user session:", error);
    return null;
  }
};

// find global user session by id
export const findGlobalUserSessionByUserId = async (userId: string) => {
  try {
    const session = await db
      .select()
      .from(globalUserSessionTable)
      .where(eq(globalUserSessionTable.userId, userId));
    return session[0];
  } catch (error) {
    console.error("Error finding user session by id:", error);
    return null;
  }
};

// destroy global user session
export const destroyGlobalUserSession = async (sessionId: string) => {
  try {
    await db
      .delete(globalUserSessionTable)
      .where(eq(globalUserSessionTable.id, sessionId));
  } catch (error) {
    console.error("Error destroying user session:", error);
  }
};
