import express from "express";
import cors from "cors";
import { WebSocketServer } from "ws";

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 10000;

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const wss = new WebSocketServer({ server, path: "/ws" });

wss.on("connection", (ws) => {
  console.log("Client connected");

  ws.on("message", (msg) => {
    try {
      const data = JSON.parse(msg);

      if (data.type === "message") {
        const reply = {
          type: "message",
          conversationId: data.conversationId,
          sender: "ai",
          text: `🤖 PrankMasterAI says: ${data.text}`,
        };

        ws.send(JSON.stringify(reply));
      }
    } catch (err) {
      console.error("Invalid message:", err);
    }
  });

  ws.on("close", () => console.log("Client disconnected"));
});

app.get("/", (req, res) => {
  res.send("PrankMasterAI backend is running");
});
