import express, { type Request, type Response } from "express";
import path from "path";
import session from "express-session";
import passport from "passport";

// other imports
import errorHandler from "./middleware/ErrorHandler";
import mainRouter from "./route";

// TypeScript declaration for Bun environment variables
declare module "bun" {
  interface Env {
    PORT: string;
    LOCAL_TESTING: boolean;
    BACKEND_URL: string;
    FRONTEND_URL: string;
    SESSION_SECRET: string;
    GOOGLE_CLIENT_ID: string;
    GOOGLE_CLIENT_SECRET: string;
  }
}
// init the express app
const app = express();
// set the trust proxy setting
if (Bun.env.NODE_ENV === "production") {
  app.set("trust proxy", 1); // Trust first proxy, useful if behind a reverse proxy like Nginx or Heroku
}
// Set up session middleware
app.use(
  session({
    secret: Bun.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: Bun.env.NODE_ENV === "production" }, // Set to true if using https
  })
);
// Middleware to parse JSON bodies
app.use(express.json());
// Middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));
// use static files from the public directory
app.use(express.static("public"));
// initialize passport for authentication
app.use(passport.initialize());
// Initialize passport session management
app.use(passport.session());
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
// Temporary route for testing the success authentication
app.get("/auth-success", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "public", "auth-success.html"));
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
