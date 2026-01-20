import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Sparkles, Volume2, Save, Share2, AlertCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import NeonButton from '@/components/ui/NeonButton';
import VoiceControls from '@/components/voice/VoiceControls';
import { base44 } from '@/api/base44Client';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const baseVoices = [
  { id: 'male_deep', name: 'Male - Deep' },
  { id: 'male_normal', name: 'Male - Normal' },
  { id: 'male_high', name: 'Male - High' },
  { id: 'female_deep', name: 'Female - Deep' },
  { id: 'female_normal', name: 'Female - Normal' },
  { id: 'female_high', name: 'Female - High' },
  { id: 'child', name: 'Child Voice' },
  { id: 'elderly', name: 'Elderly Voice' },
];

export default function CharacterCreator({ onSave, onCancel }) {
  const [character, setCharacter] = useState({
    name: '',
    avatar: '🎭',
    category: 'custom',
    description: '',
    is_public: false,
    voice_profile: {
      pitch: 1.0,
      speed: 1.0,
      emotion: 'neutral',
      base_voice: 'male_normal'
    }
  });
  const [isSaving, setIsSaving] = useState(false);
  const [showModeration, setShowModeration] = useState(false);

  const handleSubmit = async () => {
    setIsSaving(true);
    try {
      // Auto-moderate with AI
      const moderation = await base44.integrations.Core.InvokeLLM({
        prompt: `Review this custom character for safety and appropriateness:

Name: ${character.name}
Description: ${character.description}
Category: ${character.category}

Check if this character is:
1. Safe (no threats, violence, harassment)
2. Appropriate (no explicit content, hate speech)
3. Not impersonating real people maliciously

Respond with approval status and feedback.`,
        response_json_schema: {
          type: "object",
          properties: {
            approved: { type: "boolean" },
            feedback: { type: "string" },
            moderation_status: { type: "string" }
          }
        }
      });

      const characterData = {
        ...character,
        is_approved: moderation.approved,
        moderation_status: moderation.approved ? 'approved' : 'pending'
      };

      const newChar = await base44.entities.CustomCharacter.create(characterData);
      
      if (character.is_public && moderation.approved) {
        // Award reputation points
        const user = await base44.auth.me();
        try {
          const rep = await base44.entities.UserReputation.filter({ created_by: user.email });
          if (rep.length > 0) {
            await base44.entities.UserReputation.update(rep[0].id, {
              points: (rep[0].points || 0) + 10,
              characters_created: (rep[0].characters_created || 0) + 1
            });
          } else {
            await base44.entities.UserReputation.create({
              points: 10,
              characters_created: 1,
              level: 'novice'
            });
          }
        } catch (e) {
          console.error('Reputation update failed:', e);
        }
      }

      onSave?.(newChar);
    } catch (error) {
      console.error('Failed to create character:', error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Basic Info */}
      <div className="space-y-4">
        <div>
          <Label className="text-white/70">Character Name *</Label>
          <Input
            value={character.name}
            onChange={(e) => setCharacter({ ...character, name: e.target.value })}
            placeholder="e.g., Grumpy Neighbor, Tech Support Guy"
            className="mt-1 bg-white/5 border-white/10 text-white"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label className="text-white/70">Avatar Emoji</Label>
            <Input
              value={character.avatar}
              onChange={(e) => setCharacter({ ...character, avatar: e.target.value })}
              placeholder="🎭"
              className="mt-1 bg-white/5 border-white/10 text-white text-2xl text-center"
              maxLength={2}
            />
          </div>

          <div>
            <Label className="text-white/70">Category</Label>
            <Select 
              value={character.category}
              onValueChange={(v) => setCharacter({ ...character, category: v })}
            >
              <SelectTrigger className="mt-1 bg-white/5 border-white/10 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-slate-900 border-white/10">
                <SelectItem value="funny">Funny</SelectItem>
                <SelectItem value="scary">Scary</SelectItem>
                <SelectItem value="romantic">Romantic</SelectItem>
                <SelectItem value="business">Business</SelectItem>
                <SelectItem value="celebrity">Celebrity</SelectItem>
                <SelectItem value="custom">Custom</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <Label className="text-white/70">Description</Label>
          <Textarea
            value={character.description}
            onChange={(e) => setCharacter({ ...character, description: e.target.value })}
            placeholder="Describe this character's personality and voice style..."
            className="mt-1 bg-white/5 border-white/10 text-white min-h-[80px]"
          />
        </div>
      </div>

      {/* Voice Profile */}
      <div className="space-y-4">
        <h3 className="text-white/80 font-semibold flex items-center gap-2">
          <Volume2 className="w-5 h-5" />
          Voice Profile
        </h3>

        <div>
          <Label className="text-white/70">Base Voice</Label>
          <Select 
            value={character.voice_profile.base_voice}
            onValueChange={(v) => setCharacter({ 
              ...character, 
              voice_profile: { ...character.voice_profile, base_voice: v }
            })}
          >
            <SelectTrigger className="mt-1 bg-white/5 border-white/10 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-slate-900 border-white/10">
              {baseVoices.map(voice => (
                <SelectItem key={voice.id} value={voice.id}>{voice.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <VoiceControls
          pitch={character.voice_profile.pitch}
          speed={character.voice_profile.speed}
          emotion={character.voice_profile.emotion}
          onPitchChange={(v) => setCharacter({ 
            ...character, 
            voice_profile: { ...character.voice_profile, pitch: v }
          })}
          onSpeedChange={(v) => setCharacter({ 
            ...character, 
            voice_profile: { ...character.voice_profile, speed: v }
          })}
          onEmotionChange={(v) => setCharacter({ 
            ...character, 
            voice_profile: { ...character.voice_profile, emotion: v }
          })}
        />
      </div>

      {/* Share Options */}
      <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-3">
        <div className="flex items-start gap-3">
          <Checkbox
            checked={character.is_public}
            onCheckedChange={(checked) => setCharacter({ ...character, is_public: checked })}
            className="mt-1"
          />
          <div className="flex-1">
            <Label className="text-white/80 flex items-center gap-2">
              <Share2 className="w-4 h-4" />
              Share with Community
            </Label>
            <p className="text-white/40 text-xs mt-1">
              Let others use this character. Earn reputation points and badges!
            </p>
          </div>
        </div>

        {character.is_public && (
          <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
            <div className="flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
              <div className="text-blue-200/80 text-xs">
                <p className="font-medium mb-1">AI Moderation Notice</p>
                <p className="text-blue-200/60">
                  Your character will be reviewed by our AI moderator for safety. 
                  Approved characters earn you +10 reputation points!
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <Button
          variant="ghost"
          onClick={onCancel}
          className="flex-1 text-white/70 hover:text-white hover:bg-white/10"
        >
          Cancel
        </Button>
        <NeonButton
          onClick={handleSubmit}
          disabled={!character.name.trim() || isSaving}
          className="flex-1"
          icon={isSaving ? Sparkles : Save}
        >
          {isSaving ? 'Creating...' : 'Create Character'}
        </NeonButton>
      </div>
    </div>
  );
}