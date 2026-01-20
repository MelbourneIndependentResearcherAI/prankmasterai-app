import React from 'react';
import { motion } from 'framer-motion';
import { Phone, MessageSquare, Voicemail, Mic, Mail } from 'lucide-react';

const prankTypes = [
  { id: 'call', name: 'Prank Call', icon: Phone, description: 'Live AI voice call' },
  { id: 'text', name: 'Text Message', icon: MessageSquare, description: 'SMS/Chat message' },
  { id: 'voicemail', name: 'Voicemail', icon: Voicemail, description: 'Missed call voicemail' },
  { id: 'voice_message', name: 'Voice Message', icon: Mic, description: 'AI voice note' },
  { id: 'email', name: 'Email', icon: Mail, description: 'Prank email' },
  { id: 'social_dm', name: 'Direct Message', icon: MessageSquare, description: 'Social media DM' },
];

export default function PrankTypeSelector({ availableTypes, selected, onSelect }) {
  const filteredTypes = prankTypes.filter(t => availableTypes.includes(t.id));
  
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
      {filteredTypes.map((type, index) => {
        const Icon = type.icon;
        const isSelected = selected === type.id;
        
        return (
          <motion.button
            key={type.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelect(type.id)}
            className={`
              relative p-4 rounded-2xl text-left
              transition-all duration-300
              ${isSelected 
                ? 'bg-gradient-to-br from-violet-600/30 to-fuchsia-600/30 border-violet-500/50' 
                : 'bg-white/5 border-white/10 hover:bg-white/10'
              }
              border
            `}
          >
            <div className="flex items-start gap-3">
              <div className={`
                p-2 rounded-xl
                ${isSelected ? 'bg-violet-500/30' : 'bg-white/10'}
              `}>
                <Icon className={`w-5 h-5 ${isSelected ? 'text-violet-300' : 'text-white/60'}`} />
              </div>
              <div>
                <h4 className={`font-semibold ${isSelected ? 'text-white' : 'text-white/80'}`}>
                  {type.name}
                </h4>
                <p className="text-xs text-white/50 mt-0.5">{type.description}</p>
              </div>
            </div>
          </motion.button>
        );
      })}
    </div>
  );
}