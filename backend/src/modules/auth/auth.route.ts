import express from "express";

// imports of other routes
import {
  emailAuthController,
  facebookAuthController,
  githubAuthController,
  googleAuthController,
  googleAuthCallbackController,
  twitterAuthController,
} from "@modules/auth/globalUsers";
import { logoutController } from "./auth.controller";

const router = express.Router();

// This routes handles users/Organization level users authentication
router.post("/register/google", googleAuthController);
router.get("/register/google/callback", googleAuthCallbackController);
router.post("/register/facebook", facebookAuthController);
router.post("/register/github", githubAuthController);
router.post("/register/twitter", twitterAuthController);
router.post("/register/email", emailAuthController);
// Logout route for global users
router.post("/logout", logoutController);

// This routes handles users/application level users authentication
// E.g. router.post("/register/org_name/App_name/google", googleAuthController);

export default router;
