import { type Request, type Response } from "express";
import { Strategy } from "passport-google-oauth20";
import passport from "passport";

import {
  findGlobalUserByEmail,
  createGlobalUser,
  findGlobalUserById,
  findGlobalUserSessionByUserId,
  createGlobalUserSession,
} from "@db/utils/globalUser.db.utils";
import { permission } from "process";

// Configure Google OAuth strategy
passport.use(
  new Strategy(
    {
      clientID: Bun.env.GOOGLE_CLIENT_ID,
      clientSecret: Bun.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `${Bun.env.BACKEND_URL}/api/v1/auth/register/google/callback`,
    },
    async function (accessToken, refreshToken, profile, callback) {
      console.log("Google profile:", profile);
      // if (!profile || !profile.emails || profile.emails.length === 0) {
      //   return callback(new Error("No email found in Google profile"), false);
      // }
      // Check if user already exists in the database by email
      const user = await findGlobalUserByEmail(
        profile?.emails?.[0].value ?? ""
      );
      // If user exists, return the user
      if (user) {
        return callback(null, user);
      }
      // If user doesn't exist, create a new one
      const newUser = await createGlobalUser({
        email: profile?.emails?.[0].value ?? "",
        name: profile?.displayName ?? "",
        authProvider: "google",
        providerId: profile?.id ?? "",
        emailVerified: profile?.emails?.[0]?.verified ?? false,
        profilePicture: profile?.photos?.[0]?.value ?? null,
      });
      if (!newUser) {
        return callback(new Error("Failed to create new user"), false);
      }
      return callback(null, newUser);
    }
  )
);

// Serialize and deserialize user
// @ts-ignore
passport.serializeUser((user, callback) => callback(null, user.id));
// Deserialize user
// @ts-ignore
passport.deserializeUser(async (id, callback) => {
  const user = await findGlobalUserById(id as string);
  if (!user) {
    return callback(new Error("User not found"), null);
  }
  const currentSession = await findGlobalUserSessionByUserId(id as string);
  if (!currentSession) {
    return callback(new Error("Session not found"), null);
  }
  const sessionUser = {
    id: user?.id,
    role: user?.role ?? "user", // Default role for global users
    permissions: user?.permissions ?? ["read", "write"], // Default permissions for global users
    valid: currentSession?.valid ?? false, // Session validity
    sessionId: currentSession?.id ?? null, // Session ID
  };
  callback(null, sessionUser);
});

// google auth controller
export const googleAuthController = async (req: Request, res: Response) => {
  // Handle Google authentication logic here
  passport.authenticate("google", {
    scope: ["profile", "email"],
    prompt: "consent",
  })(req, res);
};

// Callback route for Google to redirect to after authentication
export const googleAuthCallbackController = async (
  req: Request,
  res: Response
) => {
  passport.authenticate(
    "google",
    { failureRedirect: "/auth-test" }, // TODO: change this to redirect to the frontend URL
    (err, user, info) => {
      if (err || !user) {
        return res.status(401).json({
          message: "Authentication failed",
          error: err.message || info,
        });
      }
      // Successful authentication, redirect or send a response
      req.logIn(user, async (err) => {
        if (err) {
          return res
            .status(500)
            .json({ message: "Login failed", error: err.message });
        }
        console.log("User logged in:", user.id);
        // Create a session for the user
        await createGlobalUserSession(user.id, req);
        // TODO: change this to redirect to the frontend URL
        return res.redirect("/auth-success"); // Redirect to the frontend URL
      });
    }
  )(req, res);
};
