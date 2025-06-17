import express, { type Request, type Response } from "express";

const router = express.Router();

router.get("/", (req: Request, res: Response) => {
  const user = req.user; // Assuming user information is stored in req.user
  res.json({ message: "User profile information", user });
});

export default router;
