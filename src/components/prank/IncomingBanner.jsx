import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import callerProfiles from "@/data/callerProfiles";

export default function IncomingBanner({ callerId = "mystery", visible }) {
  const navigate = useNavigate();
  const caller = callerProfiles.find(c => c.id === callerId);

  const handleTap = () => {
    navigate("/incoming", { state: { callerId } });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          onClick={handleTap}
          className="fixed top-0 left-0 right-0 bg-gray-900 text-white p-4 shadow-lg flex items-center gap-4 z-50 cursor-pointer"
        >
          <img
            src={caller.photo}
            alt="caller"
            className="w-12 h-12 rounded-full object-cover border border-white"
          />

          <div>
            <p className="text-lg font-semibold">{caller.name}</p>
            <p className="text-sm text-gray-300">Incoming call…</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
