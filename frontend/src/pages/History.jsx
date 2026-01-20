import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { 
  ArrowLeft, Search, Filter, Star, Phone, MessageSquare, 
  Mail, Trash2, MoreHorizontal, Loader2
} from 'lucide-react';
import AnimatedBackground from '@/components/ui/AnimatedBackground';
import GlassCard from '@/components/ui/GlassCard';
import PrankHistoryCard from '@/components/history/PrankHistoryCard';
import { base44 } from '@/api/base44Client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function History() {
  const [pranks, setPranks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterPlatform, setFilterPlatform] = useState('all');
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  
  useEffect(() => {
    loadPranks();
  }, []);
  
  const loadPranks = async () => {
    try {
      const data = await base44.entities.PrankHistory.list('-created_date', 100);
      setPranks(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };
  
  const toggleFavorite = async (prank) => {
    try {
      await base44.entities.PrankHistory.update(prank.id, {
        is_favorite: !prank.is_favorite
      });
      setPranks(pranks.map(p => 
        p.id === prank.id ? { ...p, is_favorite: !p.is_favorite } : p
      ));
    } catch (e) {
      console.error(e);
    }
  };
  
  const deletePrank = async (prank) => {
    try {
      await base44.entities.PrankHistory.delete(prank.id);
      setPranks(pranks.filter(p => p.id !== prank.id));
    } catch (e) {
      console.error(e);
    }
  };
  
  const filteredPranks = pranks.filter(prank => {
    const matchesSearch = 
      prank.recipient?.toLowerCase().includes(search.toLowerCase()) ||
      prank.recipient_name?.toLowerCase().includes(search.toLowerCase()) ||
      prank.script?.toLowerCase().includes(search.toLowerCase());
    
    const matchesType = filterType === 'all' || prank.type === filterType;
    const matchesPlatform = filterPlatform === 'all' || prank.platform === filterPlatform;
    const matchesFavorites = !showFavoritesOnly || prank.is_favorite;
    
    return matchesSearch && matchesType && matchesPlatform && matchesFavorites;
  });
  
  const groupedPranks = filteredPranks.reduce((groups, prank) => {
    const date = new Date(prank.created_date).toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric'
    });
    if (!groups[date]) groups[date] = [];
    groups[date].push(prank);
    return groups;
  }, {});

  return (
    <div className="min-h-screen relative">
      <AnimatedBackground />
      
      <div className="relative z-10 max-w-2xl mx-auto px-4 py-6 pb-24">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Link to={createPageUrl('Home')}>
            <Button variant="ghost" className="text-white/70 hover:text-white hover:bg-white/10">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back
            </Button>
          </Link>
          
          <h1 className="text-xl font-bold text-white">Prank History</h1>
          
          <div className="w-24" />
        </div>
        
        {/* Search & Filters */}
        <div className="space-y-3 mb-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search pranks..."
              className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-white/40 rounded-xl"
            />
          </div>
          
          <div className="flex gap-3">
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="flex-1 bg-white/5 border-white/10 text-white rounded-xl">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent className="bg-slate-900 border-white/10">
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="call">Calls</SelectItem>
                <SelectItem value="text">Texts</SelectItem>
                <SelectItem value="voicemail">Voicemail</SelectItem>
                <SelectItem value="voice_message">Voice Messages</SelectItem>
                <SelectItem value="email">Emails</SelectItem>
                <SelectItem value="social_dm">Social DMs</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={filterPlatform} onValueChange={setFilterPlatform}>
              <SelectTrigger className="flex-1 bg-white/5 border-white/10 text-white rounded-xl">
                <SelectValue placeholder="Platform" />
              </SelectTrigger>
              <SelectContent className="bg-slate-900 border-white/10">
                <SelectItem value="all">All Platforms</SelectItem>
                <SelectItem value="phone">Phone</SelectItem>
                <SelectItem value="gmail">Gmail</SelectItem>
                <SelectItem value="hotmail">Hotmail</SelectItem>
                <SelectItem value="instagram">Instagram</SelectItem>
                <SelectItem value="tiktok">TikTok</SelectItem>
                <SelectItem value="twitter">Twitter/X</SelectItem>
                <SelectItem value="facebook">Facebook</SelectItem>
                <SelectItem value="whatsapp">WhatsApp</SelectItem>
              </SelectContent>
            </Select>
            
            <Button
              variant="ghost"
              onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
              className={`px-3 ${showFavoritesOnly ? 'bg-amber-500/20 text-amber-400' : 'text-white/60 hover:text-white hover:bg-white/10'}`}
            >
              <Star className={`w-5 h-5 ${showFavoritesOnly ? 'fill-amber-400' : ''}`} />
            </Button>
          </div>
        </div>
        
        {/* Pranks List */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 text-violet-400 animate-spin" />
          </div>
        ) : filteredPranks.length === 0 ? (
          <GlassCard className="p-12 text-center">
            <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4">
              <Phone className="w-8 h-8 text-white/30" />
            </div>
            <h3 className="text-white/80 font-semibold mb-2">No pranks yet</h3>
            <p className="text-white/40 text-sm mb-6">Start your first prank to see it here!</p>
            <Link to={createPageUrl('NewPrank')}>
              <Button className="bg-violet-600 hover:bg-violet-700">
                Create First Prank
              </Button>
            </Link>
          </GlassCard>
        ) : (
          <div className="space-y-6">
            {Object.entries(groupedPranks).map(([date, datePranks]) => (
              <motion.div
                key={date}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <h3 className="text-white/50 text-sm font-medium mb-3 px-1">{date}</h3>
                <div className="space-y-2">
                  {datePranks.map((prank) => (
                    <PrankHistoryCard
                      key={prank.id}
                      prank={prank}
                      onToggleFavorite={toggleFavorite}
                      onDelete={deletePrank}
                    />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}