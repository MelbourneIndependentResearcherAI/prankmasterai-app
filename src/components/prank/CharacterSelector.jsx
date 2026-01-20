import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Star, Sparkles, Crown, Ghost, Heart, Briefcase, Laugh, AlertTriangle, Users } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { base44 } from '@/api/base44Client';

const characters = [
  // Funny
  { id: 'drunk_uncle', name: 'Drunk Uncle', category: 'funny', voice: 'slurred', avatar: '🥴', premium: false },
  { id: 'valley_girl', name: 'Valley Girl', category: 'funny', voice: 'high_pitched', avatar: '💅', premium: false },
  { id: 'conspiracy_guy', name: 'Conspiracy Theorist', category: 'funny', voice: 'paranoid', avatar: '👽', premium: false },
  { id: 'southern_grandma', name: 'Southern Grandma', category: 'funny', voice: 'sweet', avatar: '👵', premium: false },
  { id: 'surfer_dude', name: 'Surfer Dude', category: 'funny', voice: 'chill', avatar: '🏄', premium: false },
  
  // Scary
  { id: 'stalker', name: 'Anonymous Caller', category: 'scary', voice: 'whisper', avatar: '👤', premium: true },
  { id: 'demon', name: 'Demon Voice', category: 'scary', voice: 'deep', avatar: '😈', premium: true },
  { id: 'ghost_child', name: 'Ghost Child', category: 'scary', voice: 'eerie', avatar: '👻', premium: true },
  
  // Celebrity Impressions
  { id: 'trump', name: 'The President', category: 'celebrity', voice: 'bold', avatar: '🎤', premium: true },
  { id: 'morgan', name: 'Movie Narrator', category: 'celebrity', voice: 'deep_smooth', avatar: '🎬', premium: true },
  { id: 'arnold', name: 'Action Star', category: 'celebrity', voice: 'accent', avatar: '💪', premium: true },
  
  // Business
  { id: 'irs_agent', name: 'IRS Agent', category: 'business', voice: 'stern', avatar: '🏛️', premium: false },
  { id: 'lottery_caller', name: 'Lottery Winner', category: 'business', voice: 'excited', avatar: '🎰', premium: false },
  { id: 'bill_collector', name: 'Bill Collector', category: 'business', voice: 'threatening', avatar: '💰', premium: false },
  { id: 'telemarketer', name: 'Telemarketer', category: 'business', voice: 'pushy', avatar: '📞', premium: false },
  
  // Romantic
  { id: 'secret_admirer', name: 'Secret Admirer', category: 'romantic', voice: 'flirty', avatar: '💌', premium: false },
  { id: 'ex_girlfriend', name: 'Crazy Ex', category: 'romantic', voice: 'emotional', avatar: '💔', premium: true },
  { id: 'dating_match', name: 'Dating Match', category: 'romantic', voice: 'nervous', avatar: '💕', premium: false },
];

const categories = [
  { id: 'all', name: 'All', icon: Sparkles },
  { id: 'funny', name: 'Funny', icon: Laugh },
  { id: 'scary', name: 'Scary', icon: Ghost },
  { id: 'celebrity', name: 'Celebrity', icon: Crown },
  { id: 'business', name: 'Business', icon: Briefcase },
  { id: 'romantic', name: 'Romantic', icon: Heart },
];

export default function CharacterSelector({ selected, onSelect }) {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [customCharacters, setCustomCharacters] = useState([]);
  
  useEffect(() => {
    loadCustomCharacters();
  }, []);
  
  const loadCustomCharacters = async () => {
    try {
      const chars = await base44.entities.CustomCharacter.filter({ 
        is_public: true, 
        is_approved: true 
      });
      setCustomCharacters(chars);
    } catch (e) {
      console.error(e);
    }
  };
  
  const allCharacters = [
    ...characters,
    ...customCharacters.map(c => ({
      id: c.id,
      name: c.name,
      category: c.category,
      voice: c.voice_profile?.emotion || 'neutral',
      avatar: c.avatar,
      premium: false,
      isCustom: true
    }))
  ];
  
  const filtered = allCharacters.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === 'all' || c.category === category;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-4">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search characters..."
          className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-white/40 rounded-xl"
        />
      </div>
      
      {/* Categories */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {categories.map(cat => {
          const Icon = cat.icon;
          return (
            <button
              key={cat.id}
              onClick={() => setCategory(cat.id)}
              className={`
                flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap
                transition-all duration-200
                ${category === cat.id 
                  ? 'bg-violet-500/30 text-violet-300 border-violet-500/50' 
                  : 'bg-white/5 text-white/60 border-white/10 hover:bg-white/10'
                }
                border text-sm
              `}
            >
              <Icon className="w-4 h-4" />
              {cat.name}
            </button>
          );
        })}
      </div>
      
      {/* Characters Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-h-64 overflow-y-auto pr-2">
        <AnimatePresence mode="popLayout">
          {filtered.map((char, index) => (
            <motion.button
              key={char.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ delay: index * 0.02 }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => onSelect(char)}
              className={`
                relative p-3 rounded-xl text-left
                transition-all duration-200
                ${selected?.id === char.id 
                  ? 'bg-gradient-to-br from-violet-600/40 to-fuchsia-600/40 border-violet-500/50 ring-2 ring-violet-500/30' 
                  : 'bg-white/5 border-white/10 hover:bg-white/10'
                }
                border
              `}
            >
              {char.premium && (
                <Crown className="absolute top-2 right-2 w-3 h-3 text-amber-400" />
              )}
              {char.isCustom && (
                <Users className="absolute top-2 right-2 w-3 h-3 text-violet-400" />
              )}
              <div className="text-2xl mb-2">{char.avatar}</div>
              <h4 className="font-medium text-white/90 text-sm leading-tight">{char.name}</h4>
              <p className="text-xs text-white/40 capitalize">{char.category}</p>
            </motion.button>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

export { characters };