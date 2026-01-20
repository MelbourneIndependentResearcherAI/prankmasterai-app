import Chat from "./Chat";

export default function App() {
  return (
    <div style={{ padding: 20 }}>
      <h1>PrankMasterAI</h1>
      <Chat conversationId="prank-room-1" />
    </div>
  );
}
