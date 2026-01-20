import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Volume2, Trash2, Plus, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const emphasisLevels = [
  { value: 'none', label: 'Normal', color: 'text-white/60' },
  { value: 'reduced', label: 'Soft', color: 'text-blue-400' },
  { value: 'moderate', label: 'Emphasis', color: 'text-violet-400' },
  { value: 'strong', label: 'Strong', color: 'text-orange-400' },
];

const emotions = [
  { value: 'neutral', label: 'Neutral' },
  { value: 'happy', label: 'Happy' },
  { value: 'sad', label: 'Sad' },
  { value: 'angry', label: 'Angry' },
  { value: 'scared', label: 'Scared' },
  { value: 'excited', label: 'Excited' },
  { value: 'whispering', label: 'Whisper' },
  { value: 'shouting', label: 'Shout' },
];

export default function PhraseEditor({ script, onChange }) {
  const [phrases, setPhrases] = useState([]);
  const [showEditor, setShowEditor] = useState(false);
  
  const addPhrase = () => {
    setPhrases([...phrases, { 
      text: '', 
      emphasis: 'none', 
      emotion: 'neutral',
      pauseBefore: 0,
      pauseAfter: 0
    }]);
    setShowEditor(true);
  };
  
  const updatePhrase = (index, field, value) => {
    const updated = [...phrases];
    updated[index] = { ...updated[index], [field]: value };
    setPhrases(updated);
    onChange?.(updated);
  };
  
  const removePhrase = (index) => {
    setPhrases(phrases.filter((_, i) => i !== index));
  };
  
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Zap className="w-4 h-4 text-violet-400" />
          <h4 className="text-white/80 font-medium">Advanced Phrase Controls</h4>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowEditor(!showEditor)}
          className="text-white/60 hover:text-white"
        >
          <ChevronDown className={`w-4 h-4 transition-transform ${showEditor ? 'rotate-180' : ''}`} />
        </Button>
      </div>
      
      <AnimatePresence>
        {showEditor && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-3"
          >
            {phrases.length === 0 ? (
              <div className="text-center py-6 px-4 rounded-xl bg-white/5 border border-dashed border-white/10">
                <p className="text-white/40 text-sm mb-3">
                  Add phrases to customize emphasis and emotion
                </p>
                <Button
                  onClick={addPhrase}
                  variant="ghost"
                  size="sm"
                  className="text-violet-400 hover:text-violet-300 hover:bg-violet-500/10"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add First Phrase
                </Button>
              </div>
            ) : (
              <>
                <div className="space-y-2 max-h-64 overflow-y-auto pr-2">
                  {phrases.map((phrase, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-2"
                    >
                      <div className="flex items-start gap-2">
                        <Input
                          value={phrase.text}
                          onChange={(e) => updatePhrase(index, 'text', e.target.value)}
                          placeholder="Enter phrase..."
                          className="flex-1 bg-white/5 border-white/10 text-white text-sm"
                        />
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removePhrase(index)}
                          className="w-8 h-8 text-white/40 hover:text-red-400 hover:bg-red-500/10 flex-shrink-0"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <Select 
                            value={phrase.emphasis}
                            onValueChange={(v) => updatePhrase(index, 'emphasis', v)}
                          >
                            <SelectTrigger className="bg-white/5 border-white/10 text-white text-xs h-8">
                              <SelectValue placeholder="Emphasis" />
                            </SelectTrigger>
                            <SelectContent className="bg-slate-900 border-white/10">
                              {emphasisLevels.map(level => (
                                <SelectItem key={level.value} value={level.value}>
                                  <span className={level.color}>{level.label}</span>
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div>
                          <Select 
                            value={phrase.emotion}
                            onValueChange={(v) => updatePhrase(index, 'emotion', v)}
                          >
                            <SelectTrigger className="bg-white/5 border-white/10 text-white text-xs h-8">
                              <SelectValue placeholder="Emotion" />
                            </SelectTrigger>
                            <SelectContent className="bg-slate-900 border-white/10">
                              {emotions.map(em => (
                                <SelectItem key={em.value} value={em.value}>
                                  {em.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2 text-xs text-white/40">
                        <label className="flex items-center gap-1">
                          Pause before:
                          <input
                            type="number"
                            value={phrase.pauseBefore}
                            onChange={(e) => updatePhrase(index, 'pauseBefore', parseFloat(e.target.value) || 0)}
                            min="0"
                            max="5"
                            step="0.1"
                            className="w-12 px-1 py-0.5 rounded bg-white/5 border border-white/10 text-white"
                          />
                          s
                        </label>
                        <label className="flex items-center gap-1">
                          After:
                          <input
                            type="number"
                            value={phrase.pauseAfter}
                            onChange={(e) => updatePhrase(index, 'pauseAfter', parseFloat(e.target.value) || 0)}
                            min="0"
                            max="5"
                            step="0.1"
                            className="w-12 px-1 py-0.5 rounded bg-white/5 border border-white/10 text-white"
                          />
                          s
                        </label>
                      </div>
                    </motion.div>
                  ))}
                </div>
                
                <Button
                  onClick={addPhrase}
                  variant="ghost"
                  size="sm"
                  className="w-full text-violet-400 hover:text-violet-300 hover:bg-violet-500/10"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Another Phrase
                </Button>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}