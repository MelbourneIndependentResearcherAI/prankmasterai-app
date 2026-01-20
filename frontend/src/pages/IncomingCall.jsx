import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./incomingCall.css";

export default function IncomingCall() {
  const audioRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.play().catch(() => {});
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, []);

  const handleAccept = () => {
    navigate("/call");
  };

  const handleDecline = () => {
    navigate("/");
  };

  return (
    <div className="incoming-call-screen vibrate">
      <audio ref={audioRef} src="/ringtone.mp3" loop />

      <div className="caller-info">
        <img
          src="/caller.png"
          alt="caller"
          className="caller-photo"
        />
        <h2 className="caller-name">Unknown Caller</h2>
        <p className="caller-number">No Caller ID</p>
      </div>

      <div className="call-actions">
        <button className="decline-btn" onClick={handleDecline}>
          Decline
        </button>
        <button className="accept-btn" onClick={handleAccept}>
          Accept
        </button>
      </div>
    </div>
  );
}
