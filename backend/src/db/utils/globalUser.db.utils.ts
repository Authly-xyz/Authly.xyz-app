import { db } from "../index";
import { eq } from "drizzle-orm";

import { globalUsersTable } from "../schema/globalUsers";

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
