import express from "express";

export const publicRouter = express.Router();

// Health check endpoint
publicRouter.get("/", (req, res) => {
  res.json({
    message: "Backend API is running",
    version: "1.0.0",
  });
});

publicRouter.get("/health", (req, res) => {
  res.json({
    status: "OK",
    timestamp: new Date().toISOString(),
  });
});
