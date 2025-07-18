import { type Request, type Response } from "express";
import { Strategy } from "passport-google-oauth20";
import passport from "passport";

import {
  findGlobalUserByEmail,
  createGlobalUser,
  createGlobalUserSession,
} from "@db/utils/globalUser.db.utils";

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
    async (err, user, info) => {
      if (err || !user) {
        return res.status(401).json({
          message: "Authentication failed",
          error: err?.message || info,
        });
      }
      // Create a session for the user and set the cookie
      await createGlobalUserSession(user.id, req, res);
      return res.redirect("/auth-success");
    }
  )(req, res);
};
