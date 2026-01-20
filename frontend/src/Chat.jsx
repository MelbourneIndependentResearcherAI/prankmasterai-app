import { useEffect, useState, useRef } from "react";

export default function Chat({ conversationId, serverUrl }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const wsRef = useRef(null);

  useEffect(() => {
    const ws = new WebSocket(`${serverUrl.replace("https", "wss")}/ws`);

    wsRef.current = ws;

    ws.onopen = () => {
      ws.send(JSON.stringify({ type: "join", conversationId }));
    };

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.type === "message") {
          setMessages((prev) => [...prev, data]);
        }
      } catch (err) {
        console.error("Invalid WS message:", err);
      }
    };

    ws.onerror = (err) => console.error("WebSocket error:", err);

    ws.onclose = () => console.log("WebSocket closed");

    return () => ws.close();
  }, [conversationId, serverUrl]);

  const sendMessage = () => {
    if (!input.trim()) return;

    const msg = {
      type: "message",
      conversationId,
      text: input,
      sender: "user",
    };

    wsRef.current?.send(JSON.stringify(msg));
    setMessages((prev) => [...prev, msg]);
    setInput("");
  };

  return (
    <div>
      <div
        style={{
          border: "1px solid #ccc",
          padding: 10,
          height: 300,
          overflowY: "auto",
          marginBottom: 10,
        }}
      >
        {messages.map((m, i) => (
          <div key={i} style={{ marginBottom: 8 }}>
            <strong>{m.sender}:</strong> {m.text}
          </div>
        ))}
      </div>

      <input
        style={{ width: "80%", padding: 8 }}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type your prank message..."
      />

      <button style={{ padding: 8, marginLeft: 10 }} onClick={sendMessage}>
        Send
      </button>
    </div>
  );
}
