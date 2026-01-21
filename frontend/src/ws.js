let socket;

export function connect(roomId, onMessage) {
  socket = new WebSocket(`wss://prankmasterai-app.onrender.com/ws/${roomId}`);

  socket.onopen = () => {
    console.log("WebSocket connected");
  };

  socket.onmessage = (event) => {
    try {
      const data = JSON.parse(event.data);
      onMessage(data);
    } catch (err) {
      console.error("WS parse error:", err);
    }
  };

  socket.onerror = (err) => {
    console.error("WebSocket error:", err);
  };
}

export function sendMessage(roomId, text) {
  if (!socket || socket.readyState !== WebSocket.OPEN) {
    console.warn("WebSocket not ready");
    return;
  }

  socket.send(JSON.stringify({ roomId, text }));
}
