import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getThread, sendMessage } from "../api";
import "./MessengerThread.css";

export default function MessengerThread() {
  const { threadId } = useParams();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    async function load() {
      const data = await getThread(threadId);
      setMessages(data.messages || []);
    }
    load();
  }, [threadId]);

  async function handleSend() {
    if (!input.trim()) return;

    const newMsg = await sendMessage(threadId, input);
    setMessages((prev) => [...prev, newMsg]);
    setInput("");
  }

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
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message…"
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
}
