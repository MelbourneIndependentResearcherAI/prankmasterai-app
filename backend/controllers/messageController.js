export function handleMessage(req, res) {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }

  // Temporary echo logic
  const reply = `Backend received: ${message}`;

  res.json({ reply });
}
