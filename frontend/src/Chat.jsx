import { useEffect, useState } from "react";
import { connect, sendMessage } from "./ws";

export default function Chat({ conversationId = "default-room" }) {
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
      <div>
        {messages.map((m) => (
          <div key={m.id}>{m.text}</div>
        ))}
      </div>

      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <button onClick={handleSend}>Send</button>
    </div>
  );
}