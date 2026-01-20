import React from 'react';
import { motion } from 'framer-motion';

export default function NeonButton({ 
  children, 
  onClick, 
  variant = "primary", 
  size = "md",
  className = "",
  disabled = false,
  icon: Icon
}) {
  const variants = {
    primary: "from-violet-600 to-fuchsia-600 shadow-violet-500/50",
    secondary: "from-cyan-500 to-blue-600 shadow-cyan-500/50",
    danger: "from-red-500 to-rose-600 shadow-red-500/50",
    success: "from-emerald-500 to-green-600 shadow-emerald-500/50",
    warning: "from-amber-500 to-orange-600 shadow-amber-500/50"
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
    xl: "px-10 py-5 text-xl"
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      disabled={disabled}
      className={`
        relative overflow-hidden rounded-2xl font-semibold
        bg-gradient-to-r ${variants[variant]}
        text-white shadow-lg
        transition-all duration-300
        hover:shadow-xl hover:shadow-current/30
        disabled:opacity-50 disabled:cursor-not-allowed
        ${sizes[size]}
        ${className}
      `}
    >
      <span className="absolute inset-0 bg-gradient-to-t from-white/0 to-white/20 pointer-events-none" />
      <span className="relative flex items-center justify-center gap-2">
        {Icon && <Icon className="w-5 h-5" />}
        {children}
      </span>
    </motion.button>
  );
}