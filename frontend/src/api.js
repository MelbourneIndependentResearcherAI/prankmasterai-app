export async function sendMessageToBackend(message) {
  const response = await fetch("https://prankmasterai-app.onrender.com/api/message", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ message })
  });

  if (!response.ok) {
    throw new Error("Backend error");
  }

  return response.json();
}
