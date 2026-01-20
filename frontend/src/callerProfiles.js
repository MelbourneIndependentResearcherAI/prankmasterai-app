// Caller profiles with manual ElevenLabs voice assignment.
// You can assign any voice ID per caller.
// Rachel: 21m00Tcm4TlvDq8ikWAM
// Adam:   pNInz6obpgDQGcFmaJgB

const callerProfiles = [
  {
    id: "mystery",
    name: "Unknown Caller",
    number: "No Caller ID",
    photo: "/caller.png",
    voiceId: "21m00Tcm4TlvDq8ikWAM", // Rachel
    scriptId: "mystery",
  },
  {
    id: "boss",
    name: "Your Boss",
    number: "+61 4 1234 5678",
    photo: "/boss.png",
    voiceId: "pNInz6obpgDQGcFmaJgB", // Adam
    scriptId: "boss",
  },
  {
    id: "friend",
    name: "Best Mate",
    number: "+61 4 9876 5432",
    photo: "/friend.png",
    voiceId: "21m00Tcm4TlvDq8ikWAM", // Rachel
    scriptId: "friend",
  }
];

export default callerProfiles;
