<<<<<<< HEAD
export async function sendMessageToBackend(message) {
  const url = `${import.meta.env.VITE_BACKEND_URL}/api/chat`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ message })
  });

  if (!response.ok) {
    throw new Error("Backend error");
  }

  const data = await response.json();
  return data;
=======
export async function sendMessage(text) {
  const response = await fetch(
    "https://prankmasterai-app.onrender.com/api/message",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: text }),
    }
  );

  if (!response.ok) {
    throw new Error("Network error");
  }

  const data = await response.json();
  return data.reply;
>>>>>>> 84517a472b8e785994958cd419807d4c31eb3023
}
