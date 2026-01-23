import express from "express";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Health check
app.get("/", (req, res) => {
  res.send("PrankMasterAI backend is running");
});

// Main chat endpoint
app.post("/api/message", (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }

  // Temporary echo logic
  const reply = `Backend received: ${message}`;

  res.json({ reply });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
