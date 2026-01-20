// Hybrid TTS Engine: ElevenLabs primary, browser TTS fallback
// You assign voice IDs per caller in callerProfiles.js

export async function speakText(text, voiceId, apiKey) {
  if (!text) return;

  // Try ElevenLabs first
  if (apiKey && voiceId) {
    try {
      const audioUrl = await generateElevenLabsAudio(text, voiceId, apiKey);
      if (audioUrl) {
        playAudio(audioUrl);
        return;
      }
    } catch (err) {
      console.warn("ElevenLabs failed, falling back to browser TTS");
    }
  }

  // Browser fallback
  browserSpeak(text);
}

async function generateElevenLabsAudio(text, voiceId, apiKey) {
  const response = await fetch(
    `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`,
    {
      method: "POST",
      headers: {
        "xi-api-key": apiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text,
        model_id: "eleven_multilingual_v2",
      }),
    }
  );

  if (!response.ok) return null;

  const blob = await response.blob();
  return URL.createObjectURL(blob);
}

function playAudio(url) {
  const audio = new Audio(url);
  audio.play().catch(() => {});
}

function browserSpeak(text) {
  const utter = new SpeechSynthesisUtterance(text);
  utter.rate = 1;
  utter.pitch = 1;
  speechSynthesis.speak(utter);
}
