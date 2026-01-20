import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MessageSquare, Instagram, Music2, Twitter, Facebook, MessageCircle } from 'lucide-react';

const platforms = [
  { id: 'phone', name: 'Phone', icon: Phone, color: 'from-green-500 to-emerald-600', types: ['call', 'text', 'voicemail'] },
  { id: 'gmail', name: 'Gmail', icon: Mail, color: 'from-red-500 to-rose-600', types: ['email'] },
  { id: 'hotmail', name: 'Hotmail', icon: Mail, color: 'from-blue-500 to-cyan-600', types: ['email'] },
  { id: 'instagram', name: 'Instagram', icon: Instagram, color: 'from-pink-500 to-purple-600', types: ['social_dm', 'voice_message'] },
  { id: 'tiktok', name: 'TikTok', icon: Music2, color: 'from-slate-800 to-pink-600', types: ['social_dm', 'voice_message'] },
  { id: 'twitter', name: 'X/Twitter', icon: Twitter, color: 'from-slate-700 to-slate-900', types: ['social_dm'] },
  { id: 'facebook', name: 'Facebook', icon: Facebook, color: 'from-blue-600 to-indigo-700', types: ['social_dm', 'voice_message'] },
  { id: 'whatsapp', name: 'WhatsApp', icon: MessageCircle, color: 'from-green-500 to-green-700', types: ['text', 'voice_message', 'call'] },
];

export default function PlatformSelector({ selected, onSelect }) {
  return (
    <div className="grid grid-cols-4 gap-3">
      {platforms.map((platform, index) => {
        const Icon = platform.icon;
        const isSelected = selected === platform.id;
        
        return (
          <motion.button
            key={platform.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onSelect(platform)}
            className={`
              relative p-4 rounded-2xl flex flex-col items-center gap-2
              transition-all duration-300
              ${isSelected 
                ? `bg-gradient-to-br ${platform.color} shadow-lg shadow-current/30` 
                : 'bg-white/5 hover:bg-white/10 border border-white/10'
              }
            `}
          >
            <Icon className={`w-6 h-6 ${isSelected ? 'text-white' : 'text-white/70'}`} />
            <span className={`text-xs font-medium ${isSelected ? 'text-white' : 'text-white/60'}`}>
              {platform.name}
            </span>
            {isSelected && (
              <motion.div
                layoutId="platformGlow"
                className="absolute inset-0 rounded-2xl bg-white/10"
              />
            )}
          </motion.button>
        );
      })}
    </div>
  );
}

export { platforms };