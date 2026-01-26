// backend/server.js
import express from "express";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
  })
);

// In‑memory demo data
const threads = {
  "sms-1": {
    id: "sms-1",
    type: "sms",
    title: "SMS Thread",
    messages: [
      { id: 1, from: "them", text: "Hey, is this real?" },
      { id: 2, from: "you", text: "Testing PrankMasterAI SMS…" },
    ],
  },
  "messenger-1": {
    id: "messenger-1",
    type: "messenger",
    title: "Messenger Chat",
    messages: [
      { id: 1, from: "them", text: "Yo, what’s this?" },
      { id: 2, from: "you", text: "Testing PrankMasterAI Messenger…" },
    ],
  },
};

// GET /inbox
app.get("/inbox", (req, res) => {
  const inbox = Object.values(threads).map((t) => ({
    id: t.id,
    type: t.type,
    title: t.title,
    preview: t.messages[t.messages.length - 1]?.text || "",
  }));
  res.json({ threads: inbox });
});

// GET /thread/:threadId
app.get("/thread/:threadId", (req, res) => {
  const { threadId } = req.params;
  const thread = threads[threadId];

  if (!thread) {
    return res.status(404).json({ error: "Thread not found" });
  }

  res.json({
    id: thread.id,
    type: thread.type,
    title: thread.title,
    messages: thread.messages,
  });
});

// POST /send
app.post("/send", (req, res) => {
  const { threadId, text } = req.body;

  if (!threadId || !text?.trim()) {
    return res.status(400).json({ error: "threadId and text are required" });
  }

  if (!threads[threadId]) {
    threads[threadId] = {
      id: threadId,
      type: "sms",
      title: `Thread ${threadId}`,
      messages: [],
    };
  }

  const newMessage = {
    id: Date.now(),
    from: "you",
    text: text.trim(),
  };

  threads[threadId].messages.push(newMessage);
  res.json(newMessage);
});

app.get("/", (req, res) => {
  res.send("PrankMasterAI backend is running");
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
