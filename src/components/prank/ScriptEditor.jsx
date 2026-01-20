import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Wand2, Copy, RotateCcw, Volume2 } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import NeonButton from '@/components/ui/NeonButton';
import { base44 } from '@/api/base44Client';
import VoiceControls from '@/components/voice/VoiceControls';
import PhraseEditor from '@/components/voice/PhraseEditor';

const presetScripts = {
  call: [
    { title: "IRS Audit", content: "Hello, this is Agent Johnson from the Internal Revenue Service. We've been trying to reach you regarding an urgent matter concerning your tax returns from the past three years..." },
    { title: "Lottery Winner", content: "Congratulations! This call is to inform you that you've been selected as a potential winner of our $50,000 sweepstakes! But first, I need to verify some information..." },
    { title: "Wrong Number Romance", content: "Hey! Oh my god, I can't believe you finally answered! I've been trying to reach you since last night. Remember what you promised me at the party?" },
    { title: "Pizza Delivery Gone Wrong", content: "Hello, this is Tony from Mario's Pizzeria. We've been waiting outside your house for 45 minutes with 47 large pepperoni pizzas. The total comes to $847.50..." },
  ],
  text: [
    { title: "Mystery Admirer", content: "I've been watching you for a while now... I know that might sound creepy but I just think you're amazing. Meet me at the usual spot? 💕" },
    { title: "Fake Delivery", content: "Your Amazon package (Order #8847291) has been delivered to your neighbor at 742 Evergreen Terrace. They signed for it. Contact us if there's an issue." },
    { title: "Wrong Text Drama", content: "I can't believe you told Sarah about us!!! You PROMISED you wouldn't say anything! I'm done with you. Also, your car is getting towed right now." },
  ],
  voicemail: [
    { title: "Hospital Urgent", content: "This message is for [Name]. This is calling from Memorial Hospital. We need you to contact us immediately regarding test results. Please call back as soon as possible at..." },
    { title: "Job Interview", content: "Hi, this is HR from Google calling about your application. We were very impressed and would like to schedule a final interview with our CEO. Please call back within 24 hours or..." },
  ],
  email: [
    { title: "Nigerian Prince", content: "Dear Beloved,\n\nI am Prince Abubakar from Nigeria. I have $47 million USD trapped in a bank account and need your help to transfer it. You will receive 30% for your assistance..." },
    { title: "Fake Invoice", content: "URGENT: Invoice #INV-2024-8847\n\nDear Customer,\n\nThis is a reminder that your invoice for $12,847.00 is now overdue. Please remit payment immediately to avoid legal action..." },
  ],
  voice_message: [
    { title: "Crying Ex", content: "*sobbing* I just... I can't believe it's really over between us. I saw you at the coffee shop today with HER. How could you move on so fast? We were supposed to be forever..." },
    { title: "Angry Boss", content: "THIS IS YOUR MANAGER. I need you in my office FIRST THING tomorrow morning. We found the security footage from last Friday. Don't bother coming up with excuses. We need to talk. NOW." },
  ],
  social_dm: [
    { title: "Influencer Collab", content: "Hey! 👋 I'm a brand manager for Nike and we LOVE your content! We want to send you $5,000 worth of free products for a collab. DM me back ASAP this offer expires in 24hrs! 🔥" },
    { title: "Celebrity Follow", content: "OMG is this really you?! Drake just followed your account and DMed asking about you! He wants your number. This is his assistant btw. Can you verify your identity real quick?" },
  ],
};

export default function ScriptEditor({ prankType, character, value, onChange }) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [showPresets, setShowPresets] = useState(false);
  const [voiceSettings, setVoiceSettings] = useState({
    pitch: 1.0,
    speed: 1.0,
    emotion: 'neutral'
  });
  const [phrases, setPhrases] = useState([]);
  
  const generateScript = async () => {
    setIsGenerating(true);
    try {
      // Optimized AI generation with faster response
      const response = await base44.integrations.Core.InvokeLLM({
        prompt: `Generate a funny but believable prank ${prankType} script. 
        The character speaking is: ${character?.name || 'a mysterious caller'}
        Character personality: ${character?.category || 'funny'}
        
        Make it entertaining, slightly absurd but still believable enough to be a good prank.
        Keep it under 200 words.
        Don't include any stage directions, just the actual words they would say.`,
        response_json_schema: {
          type: "object",
          properties: {
            script: { type: "string" }
          }
        }
      });
      onChange(response.script);
    } catch (error) {
      console.error('Failed to generate script:', error);
      // Fallback to preset if AI fails
      onChange(currentPresets[0]?.content || '');
    } finally {
      setIsGenerating(false);
    }
  };
  
  const currentPresets = presetScripts[prankType] || presetScripts.call;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-white/80 font-medium">Script / Message</h3>
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowPresets(!showPresets)}
            className="text-white/60 hover:text-white hover:bg-white/10"
          >
            <Copy className="w-4 h-4 mr-2" />
            Presets
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={generateScript}
            disabled={isGenerating}
            className="text-violet-400 hover:text-violet-300 hover:bg-violet-500/10"
          >
            {isGenerating ? (
              <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }}>
                <Sparkles className="w-4 h-4 mr-2" />
              </motion.div>
            ) : (
              <Wand2 className="w-4 h-4 mr-2" />
            )}
            AI Generate
          </Button>
        </div>
      </div>
      
      {/* Presets Dropdown */}
      {showPresets && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="grid grid-cols-2 gap-2"
        >
          {currentPresets.map((preset, i) => (
            <button
              key={i}
              onClick={() => {
                onChange(preset.content);
                setShowPresets(false);
              }}
              className="p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-left transition-all"
            >
              <h4 className="text-white/90 font-medium text-sm">{preset.title}</h4>
              <p className="text-white/40 text-xs mt-1 line-clamp-2">{preset.content}</p>
            </button>
          ))}
        </motion.div>
      )}
      
      <Textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Enter your prank script here... Be creative!"
        className="min-h-[150px] bg-white/5 border-white/10 text-white placeholder:text-white/30 rounded-xl resize-none"
      />
      
      <div className="flex items-center justify-between text-xs text-white/40">
        <span>{value?.length || 0} characters</span>
        <button className="flex items-center gap-1 hover:text-white/60 transition-colors">
          <Volume2 className="w-3 h-3" />
          Preview Voice
        </button>
      </div>
      
      {/* Voice Controls */}
      <VoiceControls
        pitch={voiceSettings.pitch}
        speed={voiceSettings.speed}
        emotion={voiceSettings.emotion}
        onPitchChange={(v) => setVoiceSettings({ ...voiceSettings, pitch: v })}
        onSpeedChange={(v) => setVoiceSettings({ ...voiceSettings, speed: v })}
        onEmotionChange={(v) => setVoiceSettings({ ...voiceSettings, emotion: v })}
      />
      
      {/* Phrase-level Controls */}
      <PhraseEditor script={value} onChange={setPhrases} />
    </div>
  );
}