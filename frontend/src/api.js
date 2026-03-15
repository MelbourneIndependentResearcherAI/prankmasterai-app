const API_BASE = "https://your-render-backend-url.onrender.com"; 
// Replace with your actual Render backend URL

export async function chatWithAI(message) {
  const res = await fetch(`${API_BASE}/api/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message }),
  });

  if (!res.ok) {
    throw new Error(`Request failed with status ${res.status}`);
  }

  const data = await res.json();
  return data.reply;
}

export async function sendMessage(threadId, text) {
  const res = await fetch(`${API_BASE}/send`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ threadId, text }),
  });

  return res.json();
}

export async function getThread(threadId) {
  const res = await fetch(`${API_BASE}/thread/${threadId}`);
  return res.json();
}

export async function getInbox() {
  const res = await fetch(`${API_BASE}/inbox`);
  return res.json();
}
