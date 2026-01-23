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
}
