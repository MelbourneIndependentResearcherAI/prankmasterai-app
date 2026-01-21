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
    <div style={styles.container}>
      <div style={styles.messages}>
        {messages.map((m) => (
          <div key={m.id} style={styles.message}>
            <strong>{m.userId}:</strong> {m.text}
          </div>
        ))}
      </div>

      <div style={styles.inputRow}>
        <input
          style={styles.input}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
        />
        <button style={styles.button} onClick={handleSend}>
          Send
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: { padding: 20, maxWidth: 600, margin: "0 auto", fontFamily: "sans-serif" },
  messages: {
    border: "1px solid #ccc",
    padding: 10,
    height: 400,
    overflowY: "auto",
    marginBottom: 10,
    borderRadius: 8,
  },
  message: { padding: "6px 0", borderBottom: "1px solid #eee" },
  inputRow: { display: "flex", gap: 10 },
  input: { flex: 1, padding: 10, borderRadius: 6, border: "1px solid #ccc" },
  button: {
    padding: "10px 20px",
    borderRadius: 6,
    background: "#007bff",
    color: "white",
    border: "none",
    cursor: "pointer",
  },
};
