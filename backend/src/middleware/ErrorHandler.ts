// middleware for handling errors in the application
import { type NextFunction, type Request, type Response } from "express";

const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err.stack);
  res
    .status(500)
    .json({ message: "Internal Server Error", error: err.message });
};

export default errorHandler;
