import express from "express";

// imports of other routes
import authRoutes from "@modules/auth/auth.route";
import meRoutes from "@modules/me/me.auth";

const router = express.Router();

// Use the auth routes
router.use("/auth", authRoutes);
router.use("/me", meRoutes);

export default router;
