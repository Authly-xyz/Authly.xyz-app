import express, { type Request, type Response } from "express";
import { Strategy } from "passport-google-oauth20";
import passport from "passport";

// Configure Google OAuth strategy
passport.use(
  new Strategy(
    {
      clientID: Bun.env.GOOGLE_CLIENT_ID,
      clientSecret: Bun.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `${Bun.env.BACKEND_URL}/auth/google/callback`,
    },
    function (accessToken, refreshToken, profile, callback) {
      User.findOrCreate({ googleId: profile.id }, function (err, user) {
        return callback(err, user);
      });
    }
  )
);

// google auth controller
export const googleAuthController = async (req: Request, res: Response) => {
  // Handle Google authentication logic here
  passport.authenticate("google", { scope: ["profile"] })(req, res);
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
        return res
          .status(401)
          .json({ message: "Authentication failed", error: err || info });
      }
      // Successful authentication, redirect or send a response
      req.logIn(user, (err) => {
        if (err) {
          return res.status(500).json({ message: "Login failed", error: err });
        }
        // TODO: change this to redirect to the frontend URL
        return res.redirect("/auth-success"); // Redirect to the frontend URL
      });
    }
  )(req, res);
};
