import e, { type Request, type Response, type NextFunction } from "express";

// Middleware to check if the user is authenticated
export const isAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.isAuthenticated()) {
    return next();
  }
  if (Bun.env.LOCAL_TESTING) {
    res.redirect("/auth-test");
  } else {
    res.status(401).json({
      message: "Unauthorized access. Please log in to continue.",
    });
  }
};

// Middleware to check if the user is already authenticated
export const isAlreadyAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.isAuthenticated()) {
    if (Bun.env.LOCAL_TESTING) {
      return res.redirect("/auth-success");
    } else {
      return res.status(200).json({
        message: "User is already authenticated.",
      });
    }
  }
  next();
};
