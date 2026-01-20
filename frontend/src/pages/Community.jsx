import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { 
  ArrowLeft, Search, TrendingUp, Star, Users, Crown,
  ThumbsUp, Eye, Plus, Sparkles, Award, Zap, Filter
} from 'lucide-react';
import AnimatedBackground from '@/components/ui/AnimatedBackground';
import GlassCard from '@/components/ui/GlassCard';
import NeonButton from '@/components/ui/NeonButton';
import CharacterCreator from '@/components/community/CharacterCreator';
import { base44 } from '@/api/base44Client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

export default function Community() {
  const [scripts, setScripts] = useState([]);
  const [characters, setCharacters] = useState([]);
  const [reputation, setReputation] = useState(null);
  const [search, setSearch] = useState('');
  const [showCharacterCreator, setShowCharacterCreator] = useState(false);
  const [activeTab, setActiveTab] = useState('scripts');
  
  useEffect(() => {
    loadData();
  }, []);
  
  const loadData = async () => {
    try {
      const [communityScripts, customChars, user] = await Promise.all([
        base44.entities.PrankScript.filter({ is_community: true, is_approved: true }),
        base44.entities.CustomCharacter.filter({ is_public: true, is_approved: true }),
        base44.auth.me()
      ]);
      
      setScripts(communityScripts.sort((a, b) => (b.rating || 0) - (a.rating || 0)));
      setCharacters(customChars.sort((a, b) => (b.usage_count || 0) - (a.usage_count || 0)));
      
      // Load user reputation
      const userRep = await base44.entities.UserReputation.filter({ created_by: user.email });
      setReputation(userRep[0] || { points: 0, level: 'novice', badges: [] });
    } catch (e) {
      console.error(e);
    }
  };
  
  const rateScript = async (scriptId, rating) => {
    try {
      await base44.entities.ScriptRating.create({ script_id: scriptId, rating });
      
      // Update script rating
      const script = scripts.find(s => s.id === scriptId);
      const newRatingCount = (script.rating_count || 0) + 1;
      const newRating = ((script.rating || 0) * (script.rating_count || 0) + rating) / newRatingCount;
      
      await base44.entities.PrankScript.update(scriptId, {
        rating: newRating,
        rating_count: newRatingCount
      });
      
      loadData();
    } catch (e) {
      console.error(e);
    }
  };
  
  const getLevelBadge = (level) => {
    const badges = {
      novice: { icon: '🌱', color: 'from-green-500 to-emerald-600', name: 'Novice' },
      apprentice: { icon: '⭐', color: 'from-blue-500 to-cyan-600', name: 'Apprentice' },
      master: { icon: '💎', color: 'from-violet-500 to-purple-600', name: 'Master' },
      legend: { icon: '👑', color: 'from-amber-500 to-yellow-600', name: 'Legend' }
    };
    return badges[level] || badges.novice;
  };
  
  const levelBadge = getLevelBadge(reputation?.level);

  return (
    <div className="min-h-screen relative">
      <AnimatedBackground />
      
      <div className="relative z-10 max-w-4xl mx-auto px-4 py-6 pb-24">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Link to={createPageUrl('Home')}>
            <Button variant="ghost" className="text-white/70 hover:text-white hover:bg-white/10">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back
            </Button>
          </Link>
          
          <h1 className="text-xl font-bold text-white">Community Hub</h1>
          
          <div className="w-24" />
        </div>
        
        {/* User Stats */}
        {reputation && (
          <GlassCard className="p-4 mb-6" gradient>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${levelBadge.color} flex items-center justify-center text-3xl shadow-lg`}>
                  {levelBadge.icon}
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg">{levelBadge.name} Pranker</h3>
                  <div className="flex items-center gap-3 text-sm text-white/60">
                    <span className="flex items-center gap-1">
                      <Zap className="w-4 h-4 text-amber-400" />
                      {reputation.points} points
                    </span>
                    <span>•</span>
                    <span>{reputation.scripts_created || 0} scripts</span>
                    <span>•</span>
                    <span>{reputation.characters_created || 0} characters</span>
                  </div>
                </div>
              </div>
              
              <Button
                onClick={() => setShowCharacterCreator(true)}
                className="bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-700 hover:to-fuchsia-700"
              >
                <Plus className="w-4 h-4 mr-2" />
                Create Character
              </Button>
            </div>
          </GlassCard>
        )}
        
        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search community content..."
            className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-white/40 rounded-xl"
          />
        </div>
        
        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 bg-white/5 border border-white/10">
            <TabsTrigger value="scripts" className="data-[state=active]:bg-violet-500/30">
              <Sparkles className="w-4 h-4 mr-2" />
              Scripts ({scripts.length})
            </TabsTrigger>
            <TabsTrigger value="characters" className="data-[state=active]:bg-violet-500/30">
              <Users className="w-4 h-4 mr-2" />
              Characters ({characters.length})
            </TabsTrigger>
          </TabsList>
          
          {/* Scripts Tab */}
          <TabsContent value="scripts" className="space-y-3">
            {scripts.filter(s => 
              s.title?.toLowerCase().includes(search.toLowerCase()) ||
              s.content?.toLowerCase().includes(search.toLowerCase())
            ).map((script, i) => (
              <GlassCard key={script.id} className="p-4">
                <div className="flex items-start gap-4">
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-semibold text-white">{script.title}</h3>
                        <p className="text-white/40 text-xs">
                          by {script.creator_name || script.created_by} • {script.category}
                        </p>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                        <span className="text-white/80 font-medium">
                          {script.rating?.toFixed(1) || '0.0'}
                        </span>
                        <span className="text-white/40 text-xs">
                          ({script.rating_count || 0})
                        </span>
                      </div>
                    </div>
                    
                    <p className="text-white/60 text-sm line-clamp-2 mb-3">{script.content}</p>
                    
                    <div className="flex items-center gap-2">
                      {[1, 2, 3, 4, 5].map(rating => (
                        <button
                          key={rating}
                          onClick={() => rateScript(script.id, rating)}
                          className="hover:scale-110 transition-transform"
                        >
                          <Star className={`w-4 h-4 ${rating <= (script.rating || 0) ? 'fill-amber-400 text-amber-400' : 'text-white/20'}`} />
                        </button>
                      ))}
                      <span className="text-white/40 text-xs ml-2">Rate this</span>
                    </div>
                  </div>
                </div>
              </GlassCard>
            ))}
          </TabsContent>
          
          {/* Characters Tab */}
          <TabsContent value="characters" className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              {characters.filter(c => 
                c.name?.toLowerCase().includes(search.toLowerCase())
              ).map((char, i) => (
                <GlassCard key={char.id} className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500/30 to-fuchsia-500/30 flex items-center justify-center text-2xl">
                      {char.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-white truncate">{char.name}</h3>
                      <p className="text-white/40 text-xs mb-2">{char.category}</p>
                      <div className="flex items-center gap-2 text-xs text-white/50">
                        <Eye className="w-3 h-3" />
                        <span>{char.usage_count || 0} uses</span>
                        {char.rating > 0 && (
                          <>
                            <span>•</span>
                            <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                            <span>{char.rating?.toFixed(1)}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </GlassCard>
              ))}
            </div>
          </TabsContent>
        </Tabs>
        
        {/* Leaderboard */}
        <GlassCard className="p-6 mt-8">
          <h3 className="text-white/80 font-semibold mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-violet-400" />
            Top Contributors This Month
          </h3>
          <div className="space-y-3">
            {[
              { name: 'PrankMaster99', points: 450, level: 'legend' },
              { name: 'JokesterPro', points: 380, level: 'master' },
              { name: 'FunnyGuy42', points: 290, level: 'master' }
            ].map((user, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-white/5">
                <div className="text-2xl">{i === 0 ? '🥇' : i === 1 ? '🥈' : '🥉'}</div>
                <div className="flex-1">
                  <p className="text-white font-medium">{user.name}</p>
                  <p className="text-white/40 text-xs">{user.points} points</p>
                </div>
                <div className={`px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${getLevelBadge(user.level).color}`}>
                  {getLevelBadge(user.level).name}
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
      
      {/* Character Creator Modal */}
      <Dialog open={showCharacterCreator} onOpenChange={setShowCharacterCreator}>
        <DialogContent className="bg-slate-900 border-white/10 text-white max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Create Custom Character</DialogTitle>
          </DialogHeader>
          <CharacterCreator 
            onSave={() => {
              setShowCharacterCreator(false);
              loadData();
            }}
            onCancel={() => setShowCharacterCreator(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}