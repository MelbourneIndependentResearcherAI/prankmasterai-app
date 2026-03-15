import { useState, useEffect } from "react";
import { chatWithAI } from "./api";

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSend() {
    if (!input.trim() || loading) return;

    const userText = input;
    setInput("");

    const userMessage = {
      id: Date.now(),
      userId: "You",
      text: userText,
    };
    setMessages((prev) => [...prev, userMessage]);

    setLoading(true);

    try {
      const reply = await chatWithAI(userText);

      const botMessage = {
        id: Date.now() + 1,
        userId: "PrankMasterAI",
        text: reply,
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      const errorMessage = {
        id: Date.now() + 2,
        userId: "System",
        text: "Error contacting backend",
      };
      setMessages((prev) => [...prev, errorMessage]);
    }

    setLoading(false);
  }

  useEffect(() => {
    const box = document.getElementById("chatBox");
    if (box) box.scrollTop = box.scrollHeight;
  }, [messages, loading]);

  return (
    <div style={{ padding: 20, maxWidth: 600, margin: "0 auto" }}>
      <h2 style={{ textAlign: "center" }}>PrankMasterAI Chat</h2>

      <div
        id="chatBox"
        style={{
          border: "1px solid #ccc",
          padding: 10,
          height: 400,
          overflowY: "auto",
          marginBottom: 10,
        }}
      >
        {messages.map((m) => (
          <div
            key={m.id}
            style={{
              padding: "6px 0",
              borderBottom: "1px solid #eee",
              textAlign: m.userId === "You" ? "right" : "left",
              color: m.userId === "You" ? "#333" : "#0077cc",
            }}
          >
            <strong>{m.userId}:</strong> {m.text}
          </div>
        ))}

        {loading && (
          <div style={{ padding: "6px 0", opacity: 0.6 }}>
            <strong>PrankMasterAI:</strong> typing…
          </div>
        )}
      </div>

      <div style={{ display: "flex", gap: 10 }}>
        <input
          style={{ flex: 1, padding: 10 }}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
        />

        <button
          style={{ padding: "10px 20px" }}
          onClick={handleSend}
          disabled={loading}
        >
          Send
        </button>
      </div>
    </div>
  );
}
