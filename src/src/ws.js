let socket = null;

export function connect(conversationId, onMessage) {
  if (socket && socket.readyState === WebSocket.OPEN) {
    socket.close();
  }

  socket = new WebSocket("wss://prankmasterai-app.onrender.com");

  socket.onopen = () => {
    socket.send(
      JSON.stringify({
        type: "join",
        conversationId,
        userId: "michael"
      })
    );
  };

  socket.onmessage = (event) => {
    try {
      const data = JSON.parse(event.data);
      onMessage(data);
    } catch (err) {
      console.error("Invalid WS message:", err);
    }
  };
}

export function sendMessage(conversationId, text) {
  if (!socket || socket.readyState !== WebSocket.OPEN) return;

  socket.send(
    JSON.stringify({
      type: "message",
      conversationId,
      userId: "michael",
      text
    })
  );
}
