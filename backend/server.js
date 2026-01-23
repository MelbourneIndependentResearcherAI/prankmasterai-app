import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/message", (req, res) => {
  const userMessage = req.body.message;
  res.json({ reply: "Backend received: " + userMessage });
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log("Backend running on port", port));
