export async function sendMessage(text) {
  const backendUrl = "https://prankmasterai-app.onrender.com";

  const response = await fetch(`${backendUrl}/api/message`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message: text }),
  });

  if (!response.ok) {
    throw new Error("Backend error");
  }

  const data = await response.json();
  return data.reply;
}
