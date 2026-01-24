import express from "express";

const router = express.Router();

// Health check
router.get("/", (req, res) => {
  res.send("PrankMasterAI backend is running");
});

// Main chat endpoint
router.post("/api/message", (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }

  const reply = `Backend received: ${message}`;

  res.json({ reply });
});

export default router;
