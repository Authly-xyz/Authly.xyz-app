import express from "express";
import errorHandler from "./middleware/ErrorHandler";

const app = express();
// Middleware to parse JSON bodies
app.use(express.json());
// Middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

const PORT = Bun.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Hello, World! 🌍🌍🌍");
});

// Middleware to handle the 404 error
app.use((req, res) => {
  res.status(404).json({ message: "Not Found" });
});

// Error handling middleware
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
