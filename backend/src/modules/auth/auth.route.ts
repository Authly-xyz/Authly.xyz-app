import express from "express";

// imports of other routes
import {
  emailAuthController,
  facebookAuthController,
  githubAuthController,
  googleAuthController,
  twitterAuthController,
} from "@modules/auth/globalUsers";

const router = express.Router();

// This routes handles users/Organization level users authentication
router.post("/register/google", googleAuthController);
router.post("/register/facebook", facebookAuthController);
router.post("/register/github", githubAuthController);
router.post("/register/twitter", twitterAuthController);
router.post("/register/email", emailAuthController);

// This routes handles users/application level users authentication
// E.g. router.post("/register/org_name/App_name/google", googleAuthController);

export default router;
