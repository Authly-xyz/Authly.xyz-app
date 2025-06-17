import type { Request, Response } from "express";
import { eq } from "drizzle-orm";
import { db } from "../index";

import { globalUsersTable } from "../schema/globalUsers";
import { globalUserSessionTable } from "../schema/globalUserSession";
import { createSessionCookie } from "@utils/session";
import redis from "@/utils/redis";

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
    // Check if the user exists
    const user = await findGlobalUserById(userId);
    if (!user) {
      console.error("User not found");
      return null;
    }
    // check if the user already has an active session
    const existingSession = await db
      .select()
      .from(globalUserSessionTable)
      .where(eq(globalUserSessionTable.userId, userId));

    // If an active session exists, clear it
    if (existingSession[0]) {
      await db
        .delete(globalUserSessionTable)
        .where(eq(globalUserSessionTable.id, existingSession[0].id));
    }
    // Create a new session
    const session = await db
      .insert(globalUserSessionTable)
      .values({
        userId: userId,
        valid: true,
        userAgent: req.headers["user-agent"] || "unknown",
        ipAddress: req.ip || "0.0.0.0",
      })
      .returning();
    // check if session is in redis (g_session stand for global session)
    const cachedSession = await redis.get(`g_session:${session[0].id}`);
    if (cachedSession) {
      // clear the session from redis
      await redis.del(`g_session:${session[0].id}`);
    } else {
      // Store in Redis with a TTL (e.g., 1 day = 86400 seconds)
      await redis.set(
        `g_session:${session[0].id}`,
        JSON.stringify(session[0]),
        "EX",
        86400
      );
    }
    // Create session cookie
    createSessionCookie(res, session[0].id);
    return session[0];
  } catch (error) {
    console.error("Error creating user session:", error);
    return null;
  }
};

// find global user session by id
export const findGlobalUserSessionById = async (sessionId: string) => {
  try {
    // Check if the session exists in Redis
    const cachedSession = await redis.get(`g_session:${sessionId}`);
    if (cachedSession) {
      console.log("Session found in Redis:", cachedSession);
      return JSON.parse(cachedSession);
    }
    // If not found in Redis, query the database
    console.log("Session not found in Redis, querying database...");
    const session = await db
      .select()
      .from(globalUserSessionTable)
      .where(eq(globalUserSessionTable.id, sessionId));
    return session[0];
  } catch (error) {
    console.error("Error finding user session by id:", error);
    return null;
  }
};

// destroy global user session
export const destroyGlobalUserSession = async (sessionId: string) => {
  try {
    const cachedSession = await redis.get(`g_session:${sessionId}`);
    if (cachedSession) {
      console.log("Session found in Redis, deleting...", sessionId);
      await redis.del(`g_session:${sessionId}`);
    }
    // Delete the session from the database
    console.log("Destroying user session with ID:", sessionId);
    await db
      .delete(globalUserSessionTable)
      .where(eq(globalUserSessionTable.id, sessionId));
  } catch (error) {
    console.error("Error destroying user session:", error);
  }
};
