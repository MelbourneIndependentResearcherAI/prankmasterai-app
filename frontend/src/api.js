export async function sendMessage(userMessage) {
  const response = await fetch("https://prankmasterai-app.onrender.com/api/message", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: userMessage })
  });

  const data = await response.json();
  return data.reply;
}
