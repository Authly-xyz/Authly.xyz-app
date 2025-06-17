import express from "express";

// imports of other routes
import authRoutes from "@modules/auth/auth.route";

const router = express.Router();

// Use the auth routes
router.use("/auth", authRoutes);

export default router;
