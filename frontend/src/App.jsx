import { useState } from "react";
import { sendMessageToBackend } from "./api";

export default function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  async function handleSend() {
    if (!input.trim()) return;

    const userMessage = { sender: "You", text: input };
    setMessages(prev => [...prev, userMessage]);

    try {
      const backendReply = await sendMessageToBackend(input);

      const botMessage = {
        sender: "Bot",
        text: backendReply.reply || "No response"
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (err) {
      const errorMessage = {
        sender: "Bot",
        text: "Error contacting backend"
      };
      setMessages(prev => [...prev, errorMessage]);
    }

    setInput("");
  }

  return (
    <div style={{
      width: "100%",
      maxWidth: "500px",
      margin: "0 auto",
      padding: "20px",
      fontFamily: "Arial"
    }}>
      <h2>PrankMasterAI Chat</h2>

      <div style={{
        border: "1px solid #ccc",
        padding: "10px",
        height: "400px",
        overflowY: "auto",
        marginBottom: "10px"
      }}>
        {messages.map((msg, index) => (
          <div key={index} style={{ marginBottom: "10px" }}>
            <strong>{msg.sender}:</strong> {msg.text}
          </div>
        ))}
      </div>

      <div style={{ display: "flex", gap: "10px" }}>
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Type a message..."
          style={{ flex: 1, padding: "10px" }}
        />
        <button
          onClick={handleSend}
          style={{
            padding: "10px 20px",
            background: "#007bff",
            color: "white",
            border: "none",
            cursor: "pointer"
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
}

