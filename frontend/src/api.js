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
}
