import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { 
  Phone, MessageSquare, Voicemail, Mic, Mail, 
  Sparkles, ChevronRight, History, Users, Star,
  Zap, Crown, TrendingUp, Play
} from 'lucide-react';
import AnimatedBackground from '@/components/ui/AnimatedBackground';
import GlassCard from '@/components/ui/GlassCard';
import NeonButton from '@/components/ui/NeonButton';
import { base44 } from '@/api/base44Client';

const quickActions = [
  { id: 'call', name: 'Prank Call', icon: Phone, color: 'from-green-500 to-emerald-600', desc: 'AI voice calls' },
  { id: 'text', name: 'Fake Text', icon: MessageSquare, color: 'from-blue-500 to-cyan-600', desc: 'SMS pranks' },
  { id: 'voicemail', name: 'Voicemail', icon: Voicemail, color: 'from-purple-500 to-violet-600', desc: 'Missed calls' },
  { id: 'voice', name: 'Voice Note', icon: Mic, color: 'from-pink-500 to-rose-600', desc: 'Audio messages' },
  { id: 'email', name: 'Fake Email', icon: Mail, color: 'from-amber-500 to-orange-600', desc: 'Email pranks' },
];

const featuredPranks = [
  { title: "IRS Agent", plays: "12.5K", category: "Business", avatar: "🏛️" },
  { title: "Secret Admirer", plays: "8.2K", category: "Romantic", avatar: "💌" },
  { title: "Pizza Disaster", plays: "15.1K", category: "Funny", avatar: "🍕" },
  { title: "Lottery Winner", plays: "9.8K", category: "Business", avatar: "🎰" },
];

export default function Home() {
  const [recentPranks, setRecentPranks] = useState([]);
  const [stats, setStats] = useState({ total: 0, favorites: 0 });
  
  useEffect(() => {
    loadData();
  }, []);
  
  const loadData = async () => {
    try {
      const pranks = await base44.entities.PrankHistory.list('-created_date', 3);
      setRecentPranks(pranks);
      
      const allPranks = await base44.entities.PrankHistory.list();
      const favorites = allPranks.filter(p => p.is_favorite).length;
      setStats({ total: allPranks.length, favorites });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="min-h-screen relative">
      <AnimatedBackground />
      
      <div className="relative z-10 max-w-4xl mx-auto px-4 py-8 pb-24">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/20 border border-violet-500/30 text-violet-300 text-sm mb-4"
          >
            <Sparkles className="w-4 h-4" />
            AI-Powered Pranks
          </motion.div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
            Prank<span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400">Master</span> Pro
          </h1>
          <p className="text-white/60 text-lg max-w-md mx-auto">
            The ultimate AI prank platform. Calls, texts, voicemails, emails & social DMs.
          </p>
        </motion.div>
        
        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-white/80 font-semibold">Quick Prank</h2>
            <Link 
              to={createPageUrl('NewPrank')}
              className="text-violet-400 text-sm flex items-center gap-1 hover:text-violet-300 transition-colors"
            >
              See all <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-5 gap-3">
            {quickActions.map((action, i) => (
              <Link key={action.id} to={createPageUrl(`NewPrank?type=${action.id}`)}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 + i * 0.05 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  className={`
                    p-4 rounded-2xl text-center cursor-pointer
                    bg-gradient-to-br ${action.color}
                    shadow-lg shadow-current/20
                    transition-all duration-300
                  `}
                >
                  <action.icon className="w-6 h-6 text-white mx-auto mb-2" />
                  <p className="text-white text-xs font-medium truncate">{action.name}</p>
                </motion.div>
              </Link>
            ))}
          </div>
        </motion.div>
        
        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-3 gap-4 mb-8"
        >
          <GlassCard className="p-4 text-center">
            <Zap className="w-6 h-6 text-violet-400 mx-auto mb-2" />
            <p className="text-2xl font-bold text-white">{stats.total}</p>
            <p className="text-white/50 text-xs">Total Pranks</p>
          </GlassCard>
          
          <GlassCard className="p-4 text-center">
            <Star className="w-6 h-6 text-amber-400 mx-auto mb-2" />
            <p className="text-2xl font-bold text-white">{stats.favorites}</p>
            <p className="text-white/50 text-xs">Favorites</p>
          </GlassCard>
          
          <GlassCard className="p-4 text-center">
            <TrendingUp className="w-6 h-6 text-emerald-400 mx-auto mb-2" />
            <p className="text-2xl font-bold text-white">98%</p>
            <p className="text-white/50 text-xs">Success Rate</p>
          </GlassCard>
        </motion.div>
        
        {/* Featured Pranks */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-white/80 font-semibold flex items-center gap-2">
              <Crown className="w-4 h-4 text-amber-400" />
              Featured Scripts
            </h2>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            {featuredPranks.map((prank, i) => (
              <Link key={i} to={createPageUrl('NewPrank')}>
                <GlassCard className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500/30 to-fuchsia-500/30 flex items-center justify-center text-2xl">
                      {prank.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-white truncate">{prank.title}</h3>
                      <div className="flex items-center gap-2 text-xs text-white/50">
                        <span className="flex items-center gap-1">
                          <Play className="w-3 h-3" />
                          {prank.plays}
                        </span>
                        <span>•</span>
                        <span>{prank.category}</span>
                      </div>
                    </div>
                  </div>
                </GlassCard>
              </Link>
            ))}
          </div>
        </motion.div>
        
        {/* Recent Activity */}
        {recentPranks.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-white/80 font-semibold flex items-center gap-2">
                <History className="w-4 h-4" />
                Recent Activity
              </h2>
              <Link 
                to={createPageUrl('History')}
                className="text-violet-400 text-sm flex items-center gap-1 hover:text-violet-300 transition-colors"
              >
                View all <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
            
            <div className="space-y-2">
              {recentPranks.map((prank, i) => (
                <GlassCard key={prank.id} className="p-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                      <Phone className="w-4 h-4 text-white/60" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white font-medium truncate">
                        {prank.recipient_name || prank.recipient}
                      </p>
                      <p className="text-white/40 text-xs truncate">{prank.script}</p>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      prank.status === 'completed' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'
                    }`}>
                      {prank.status}
                    </span>
                  </div>
                </GlassCard>
              ))}
            </div>
          </motion.div>
        )}
        
        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-10 text-center space-y-4"
        >
          <Link to={createPageUrl('NewPrank')}>
            <NeonButton variant="primary" size="xl" icon={Sparkles}>
              Start New Prank
            </NeonButton>
          </Link>
          <div>
            <Link to={createPageUrl('Landing')} className="text-white/40 hover:text-white/60 text-sm transition-colors">
              New here? See how it works →
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}