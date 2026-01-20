import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PhoneOff, Mic, MicOff, Volume2, VolumeX, User } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";

import callerProfiles from "@/data/callerProfiles";
import callScripts from "@/data/callScripts";
import { speakText } from "@/lib/ttsEngine";

export default function CallSimulator() {
  const location = useLocation();
  const navigate = useNavigate();

  const callerId = location.state?.callerId || "mystery";
  const caller = callerProfiles.find(c => c.id === callerId);

  const script = callScripts[caller.scriptId] || [];

  const [callState, setCallState] = useState("connecting");
  const [muted, setMuted] = useState(false);
  const [speaker, setSpeaker] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const [currentLineIndex, setCurrentLineIndex] = useState(-1);
  const [currentText, setCurrentText] = useState("");

  const elevenApiKey = ""; // ← ADD YOUR ELEVENLABS API KEY HERE

  // Call duration timer
  useEffect(() => {
    if (callState === "active") {
      const interval = setInterval(() => {
        setCallDuration(prev => prev + 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [callState]);

  // Transition from "connecting" → "active"
  useEffect(() => {
    const timer = setTimeout(() => {
      setCallState("active");
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  // Script playback engine
  useEffect(() => {
    if (callState !== "active") return;
    if (!script.length) return;

    let totalDelay = 0;

    script.forEach((line, index) => {
      totalDelay += line.delay;

      setTimeout(() => {
        setCurrentLineIndex(index);
        setCurrentText(line.text);

        if (!muted) {
          speakText(line.text, caller.voiceId, elevenApiKey);
        }
      }, totalDelay);
    });
  }, [callState, script, muted]);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const endCall = () => {
    setCallState("ended");
    setTimeout(() => {
      navigate("/");
    }, 800);
  };

  return (
    <div className="h-screen w-full bg-black text-white flex flex-col justify-between p-8">
      <div className="text-center mt-10">
        <div className="mx-auto w-32 h-32 rounded-full bg-gray-700 flex items-center justify-center overflow-hidden">
          {caller.photo ? (
            <img src={caller.photo} alt="caller" className="w-full h-full object-cover" />
          ) : (
            <User size={60} />
          )}
        </div>

        <h2 className="text-3xl mt-4">{caller.name}</h2>
        <p className="text-gray-400">{caller.number}</p>

        <AnimatePresence mode="wait">
          {callState === "connecting" && (
            <motion.p
              key="connecting"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-gray-400 mt-2"
            >
              Connecting…
            </motion.p>
          )}

          {callState === "active" && (
            <motion.p
              key="active"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-gray-400 mt-2"
            >
              {formatTime(callDuration)}
            </motion.p>
          )}

          {callState === "ended" && (
            <motion.p
              key="ended"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-red-400 mt-2"
            >
              Call Ended
            </motion.p>
          )}
        </AnimatePresence>

        {/* Script text display */}
        {callState === "active" && currentText && (
          <motion.div
            key={currentLineIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 text-xl text-gray-200"
          >
            {currentText}
          </motion.div>
        )}
      </div>

      {callState !== "ended" && (
        <div className="flex justify-center gap-10 mb-10">
          <button
            onClick={() => setMuted(!muted)}
            className="w-16 h-16 rounded-full bg-gray-700 flex items-center justify-center"
          >
            {muted ? <MicOff size={28} /> : <Mic size={28} />}
          </button>

          <button
            onClick={endCall}
            className="w-20 h-20 rounded-full bg-red-600 flex items-center justify-center"
          >
            <PhoneOff size={32} />
          </button>

          <button
            onClick={() => setSpeaker(!speaker)}
            className="w-16 h-16 rounded-full bg-gray-700 flex items-center justify-center"
          >
            {speaker ? <VolumeX size={28} /> : <Volume2 size={28} />}
          </button>
        </div>
      )}
    </div>
  );
}
