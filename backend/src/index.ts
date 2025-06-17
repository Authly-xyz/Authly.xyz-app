import express, { type Request, type Response } from "express";
import path from "path";
import errorHandler from "./middleware/ErrorHandler";
import mainRouter from "./route";

const app = express();
// Middleware to parse JSON bodies
app.use(express.json());
// Middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));
// use static files from the public directory
app.use(express.static("public"));
// TypeScript declaration for Bun environment variables
declare module "bun" {
  interface Env {
    PORT: string;
  }
}
// Set the port from environment variables or default to 5000
const PORT = Bun.env.PORT || 5000;
// Serve the index.html file for the root route
app.get("/", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});
// Temporary route for authentication testing
app.get("/auth-test", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "public", "auth.html"));
});
// Use the main router for all other routes
app.use("/api/v1", mainRouter);

// Middleware to handle the 404 error
app.use((req: Request, res: Response) => {
  res.status(404).json({ message: `${req.originalUrl} is Not Found` });
});

// Error handling middleware
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
