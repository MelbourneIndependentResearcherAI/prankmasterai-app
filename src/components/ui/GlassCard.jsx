import React from 'react';
import { motion } from 'framer-motion';

export default function GlassCard({ children, className = "", onClick, gradient = false }) {
  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`
        relative overflow-hidden rounded-3xl
        ${gradient 
          ? 'bg-gradient-to-br from-white/10 to-white/5' 
          : 'bg-white/10'
        }
        backdrop-blur-xl border border-white/20
        shadow-[0_8px_32px_rgba(0,0,0,0.12)]
        transition-all duration-300 cursor-pointer
        hover:border-white/30 hover:shadow-[0_16px_48px_rgba(0,0,0,0.15)]
        ${className}
      `}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
      {children}
    </motion.div>
  );
}