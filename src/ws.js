let socket = null;

export function connect(conversationId, onMessage) {
  socket = new WebSocket("ws://localhost:4000");

  socket.onopen = () => {
    socket.send(JSON.stringify({
      type: "join",
      conversationId,
      userId: "michael"
    }));
  };

  socket.onmessage = (event) => {
    const data = JSON.parse(event.data);
    onMessage(data);
  };
}

export function sendMessage(conversationId, text) {
  if (!socket || socket.readyState !== WebSocket.OPEN) return;

  socket.send(JSON.stringify({
    type: "message",
    conversationId,
    userId: "michael",
    text
  }));
}
