import React from 'react';
import { motion } from 'framer-motion';
import { Sliders, Volume2, Gauge, Heart, Frown, Smile, Meh, Angry, Zap } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';

const emotionalTones = [
  { id: 'neutral', name: 'Neutral', icon: Meh, color: 'text-slate-400' },
  { id: 'happy', name: 'Happy', icon: Smile, color: 'text-yellow-400' },
  { id: 'sad', name: 'Sad', icon: Frown, color: 'text-blue-400' },
  { id: 'angry', name: 'Angry', icon: Angry, color: 'text-red-400' },
  { id: 'excited', name: 'Excited', icon: Zap, color: 'text-orange-400' },
  { id: 'serious', name: 'Serious', icon: Meh, color: 'text-indigo-400' },
];

export default function VoiceControls({ 
  pitch = 1.0,
  speed = 1.0, 
  emotion = 'neutral',
  onPitchChange,
  onSpeedChange,
  onEmotionChange 
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6 p-5 rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10"
    >
      <div className="flex items-center gap-2 mb-4">
        <Sliders className="w-5 h-5 text-violet-400" />
        <h3 className="text-white/90 font-semibold">Voice Customization</h3>
      </div>
      
      {/* Pitch Control */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label className="text-white/70 flex items-center gap-2">
            <Volume2 className="w-4 h-4" />
            Pitch
          </Label>
          <span className="text-white/50 text-sm font-mono">
            {pitch.toFixed(2)}x
          </span>
        </div>
        <Slider
          value={[pitch]}
          onValueChange={(v) => onPitchChange?.(v[0])}
          min={0.5}
          max={2.0}
          step={0.1}
          className="w-full"
        />
        <div className="flex justify-between text-xs text-white/40">
          <span>Lower</span>
          <span>Normal</span>
          <span>Higher</span>
        </div>
      </div>
      
      {/* Speed Control */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label className="text-white/70 flex items-center gap-2">
            <Gauge className="w-4 h-4" />
            Speed
          </Label>
          <span className="text-white/50 text-sm font-mono">
            {speed.toFixed(2)}x
          </span>
        </div>
        <Slider
          value={[speed]}
          onValueChange={(v) => onSpeedChange?.(v[0])}
          min={0.5}
          max={2.0}
          step={0.1}
          className="w-full"
        />
        <div className="flex justify-between text-xs text-white/40">
          <span>Slower</span>
          <span>Normal</span>
          <span>Faster</span>
        </div>
      </div>
      
      {/* Emotional Tone */}
      <div className="space-y-3">
        <Label className="text-white/70 flex items-center gap-2">
          <Heart className="w-4 h-4" />
          Emotional Tone
        </Label>
        <div className="grid grid-cols-3 gap-2">
          {emotionalTones.map((tone) => {
            const Icon = tone.icon;
            const isSelected = emotion === tone.id;
            
            return (
              <motion.button
                key={tone.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onEmotionChange?.(tone.id)}
                className={`
                  p-3 rounded-xl flex flex-col items-center gap-1.5
                  transition-all duration-200
                  ${isSelected 
                    ? 'bg-violet-500/30 border-violet-500/50 ring-2 ring-violet-500/30' 
                    : 'bg-white/5 border-white/10 hover:bg-white/10'
                  }
                  border
                `}
              >
                <Icon className={`w-5 h-5 ${isSelected ? 'text-violet-300' : tone.color}`} />
                <span className={`text-xs ${isSelected ? 'text-white' : 'text-white/60'}`}>
                  {tone.name}
                </span>
              </motion.button>
            );
          })}
        </div>
      </div>
      
      {/* Preview Button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full py-3 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-medium flex items-center justify-center gap-2 shadow-lg shadow-violet-500/20"
      >
        <Volume2 className="w-4 h-4" />
        Preview Voice
      </motion.button>
    </motion.div>
  );
}