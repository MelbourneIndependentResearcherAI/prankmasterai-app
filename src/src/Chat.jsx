import { useEffect, useState } from "react";
import { connect, sendMessage } from "../ws";

export default function Chat({ conversationId }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    connect(conversationId, (data) => {
      if (data.type === "message") {
        setMessages((prev) => [...prev, data.message]);
      }
    });
  }, [conversationId]);

  function handleSend() {
    if (!input.trim()) return;
    sendMessage(conversationId, input);
    setInput("");
  }

  return (
    <div>
      <div
        style={{
          border: "1px solid #ccc",
          padding: 10,
          height: 300,
          overflowY: "auto",
          marginBottom: 10,
          borderRadius: 8
        }}
      >
        {messages.map((m) => (
          <div key={m.id} style={{ marginBottom: 8 }}>
            <strong>{m.userId}:</strong> {m.text}
          </div>
        ))}
      </div>

      <div style={{ display: "flex", gap: 10 }}>
        <input
          style={{ flex: 1, padding: 10 }}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
}
