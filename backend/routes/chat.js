import express from "express";
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { message } = req.body;

    // Simple placeholder response
    const reply = `You said: ${message}`;

    res.json({ reply });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
