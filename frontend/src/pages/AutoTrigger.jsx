import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function AutoTrigger() {
  const navigate = useNavigate();

  // Change this to adjust delay (in milliseconds)
  const delay = 5000; // 5 seconds

  // Change this to choose which caller profile triggers
  const callerId = "mystery"; // "boss", "friend", etc.

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/incoming", { state: { callerId } });
    }, delay);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="h-screen w-full flex items-center justify-center bg-black text-white text-2xl">
      Preparing your prank…
    </div>
  );
}
