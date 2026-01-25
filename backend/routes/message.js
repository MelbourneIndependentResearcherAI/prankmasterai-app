import express from "express";
const router = express.Router();

router.post("/", (req, res) => {
  const { message } = req.body;
  const reply = `You said: ${message}`;
  res.json({ reply });
});

export default router;
