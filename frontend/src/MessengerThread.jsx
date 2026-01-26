import { useParams } from "react-router-dom";
import { useState } from "react";
import "./MessengerThread.css";

export default function MessengerThread() {
  const { threadId } = useParams();
  const [messages, setMessages] = useState([
    { id: 1, from: "them", text: "Hey, what's up?" },
    { id: 2, from: "you", text: "Not much, testing Messenger thread!" },
  ]);

  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input.trim()) return;

    setMessages((prev) => [
      ...prev,
      { id: Date.now(), from: "you", text: input },
    ]);

    setInput("");
  };

  return (
    <div className="messenger-thread-container">
      <h2 className="messenger-title">Messenger Thread: {threadId}</h2>

      <div className="messenger-messages">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`messenger-message ${
              m.from === "you" ? "from-you" : "from-them"
            }`}
          >
            {m.text}
          </div>
        ))}
      </div>

      <div className="messenger-input-bar">
        <input
          type="text"
          placeholder="Type a message…"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}
