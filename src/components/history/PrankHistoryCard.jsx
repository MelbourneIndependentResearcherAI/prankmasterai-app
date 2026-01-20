import React from 'react';
import { motion } from 'framer-motion';
import { 
  Phone, MessageSquare, Voicemail, Mic, Mail, 
  Clock, Star, Play, MoreVertical, CheckCircle, XCircle,
  Instagram, Music2, Twitter, Facebook, MessageCircle
} from 'lucide-react';
import { format } from 'date-fns';
import GlassCard from '@/components/ui/GlassCard';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const typeIcons = {
  call: Phone,
  text: MessageSquare,
  voicemail: Voicemail,
  voice_message: Mic,
  email: Mail,
  social_dm: MessageSquare,
};

const platformIcons = {
  phone: Phone,
  gmail: Mail,
  hotmail: Mail,
  instagram: Instagram,
  tiktok: Music2,
  twitter: Twitter,
  facebook: Facebook,
  whatsapp: MessageCircle,
};

const statusColors = {
  completed: 'text-emerald-400 bg-emerald-500/20',
  answered: 'text-emerald-400 bg-emerald-500/20',
  failed: 'text-red-400 bg-red-500/20',
  pending: 'text-amber-400 bg-amber-500/20',
  no_answer: 'text-gray-400 bg-gray-500/20',
};

export default function PrankHistoryCard({ prank, onToggleFavorite, onDelete, onPlayback }) {
  const TypeIcon = typeIcons[prank.type] || MessageSquare;
  const PlatformIcon = platformIcons[prank.platform] || Phone;
  
  return (
    <GlassCard className="p-4">
      <div className="flex items-start gap-4">
        {/* Icon */}
        <div className="relative">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500/30 to-fuchsia-500/30 flex items-center justify-center">
            <TypeIcon className="w-5 h-5 text-violet-300" />
          </div>
          <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-slate-900 flex items-center justify-center">
            <PlatformIcon className="w-3 h-3 text-white/70" />
          </div>
        </div>
        
        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-1">
            <div>
              <h3 className="font-semibold text-white truncate">
                {prank.recipient_name || prank.recipient}
              </h3>
              <p className="text-white/50 text-sm">{prank.recipient}</p>
            </div>
            
            <div className="flex items-center gap-2">
              {/* Status Badge */}
              <span className={`text-xs px-2 py-1 rounded-full ${statusColors[prank.status]}`}>
                {prank.status === 'completed' || prank.status === 'answered' ? (
                  <CheckCircle className="w-3 h-3 inline mr-1" />
                ) : prank.status === 'failed' ? (
                  <XCircle className="w-3 h-3 inline mr-1" />
                ) : null}
                {prank.status}
              </span>
              
              {/* More Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="p-1 hover:bg-white/10 rounded-lg transition-colors">
                    <MoreVertical className="w-4 h-4 text-white/50" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-slate-900 border-white/10">
                  <DropdownMenuItem 
                    onClick={() => onToggleFavorite?.(prank)}
                    className="text-white/80 hover:text-white focus:text-white focus:bg-white/10"
                  >
                    <Star className={`w-4 h-4 mr-2 ${prank.is_favorite ? 'fill-amber-400 text-amber-400' : ''}`} />
                    {prank.is_favorite ? 'Remove Favorite' : 'Add to Favorites'}
                  </DropdownMenuItem>
                  {prank.audio_url && (
                    <DropdownMenuItem 
                      onClick={() => onPlayback?.(prank)}
                      className="text-white/80 hover:text-white focus:text-white focus:bg-white/10"
                    >
                      <Play className="w-4 h-4 mr-2" />
                      Play Recording
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem 
                    onClick={() => onDelete?.(prank)}
                    className="text-red-400 hover:text-red-300 focus:text-red-300 focus:bg-red-500/10"
                  >
                    <XCircle className="w-4 h-4 mr-2" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          
          {/* Details */}
          <div className="flex items-center gap-4 text-xs text-white/40 mt-2">
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {format(new Date(prank.created_date), 'MMM d, h:mm a')}
            </span>
            {prank.duration && (
              <span>{Math.floor(prank.duration / 60)}:{String(prank.duration % 60).padStart(2, '0')}</span>
            )}
            {prank.character && (
              <span className="text-violet-400">{prank.character}</span>
            )}
          </div>
          
          {/* Script Preview */}
          {prank.script && (
            <p className="text-white/50 text-sm mt-2 line-clamp-2">
              "{prank.script}"
            </p>
          )}
        </div>
        
        {/* Favorite Star */}
        {prank.is_favorite && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute top-3 right-3"
          >
            <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
          </motion.div>
        )}
      </div>
    </GlassCard>
  );
}