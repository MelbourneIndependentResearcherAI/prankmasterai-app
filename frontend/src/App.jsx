import { useState } from "react";

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  function handleSend() {
    if (!input.trim()) return;

    const fakeMessage = {
      id: Date.now(),
      userId: "You",
      text: input,
    };

    setMessages((prev) => [...prev, fakeMessage]);
    setInput("");
  }

  return (
    <div style={{ padding: 20, maxWidth: 600, margin: "0 auto" }}>
      <h2 style={{ textAlign: "center" }}>PrankMasterAi Chat</h2>

      <div style={{ border: "1px solid #ccc", padding: 10, height: 400, overflowY: "auto", marginBottom: 10 }}>
        {messages.map((m) => (
          <div key={m.id} style={{ padding: "6px 0", borderBottom: "1px solid #eee" }}>
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
        <button style={{ padding: "10px 20px" }} onClick={handleSend}>
          Send
        </button>
      </div>
    </div>
  );
}
