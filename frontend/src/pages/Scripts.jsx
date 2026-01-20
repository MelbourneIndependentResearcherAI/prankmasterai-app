import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { 
  ArrowLeft, Search, Plus, Star, Crown, Laugh, Ghost, 
  Heart, Briefcase, Sparkles, Copy, Edit2, Trash2, Loader2,
  Phone, MessageSquare, Voicemail, Mail, Play
} from 'lucide-react';
import AnimatedBackground from '@/components/ui/AnimatedBackground';
import GlassCard from '@/components/ui/GlassCard';
import NeonButton from '@/components/ui/NeonButton';
import { base44 } from '@/api/base44Client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const categories = [
  { id: 'all', name: 'All', icon: Sparkles },
  { id: 'funny', name: 'Funny', icon: Laugh },
  { id: 'scary', name: 'Scary', icon: Ghost },
  { id: 'romantic', name: 'Romantic', icon: Heart },
  { id: 'business', name: 'Business', icon: Briefcase },
  { id: 'celebrity', name: 'Celebrity', icon: Crown },
];

const typeIcons = {
  call: Phone,
  text: MessageSquare,
  voicemail: Voicemail,
  email: Mail,
};

const categoryColors = {
  funny: 'from-amber-500 to-orange-600',
  scary: 'from-purple-500 to-violet-700',
  romantic: 'from-pink-500 to-rose-600',
  business: 'from-blue-500 to-indigo-600',
  celebrity: 'from-amber-400 to-yellow-600',
  custom: 'from-slate-500 to-slate-600',
};

export default function Scripts() {
  const [scripts, setScripts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [editingScript, setEditingScript] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: 'funny',
    type: 'call',
    character: '',
  });
  
  useEffect(() => {
    loadScripts();
  }, []);
  
  const loadScripts = async () => {
    try {
      const data = await base44.entities.PrankScript.list('-popularity', 100);
      setScripts(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };
  
  const handleSubmit = async () => {
    try {
      if (editingScript) {
        await base44.entities.PrankScript.update(editingScript.id, formData);
        setScripts(scripts.map(s => 
          s.id === editingScript.id ? { ...s, ...formData } : s
        ));
      } else {
        const newScript = await base44.entities.PrankScript.create(formData);
        setScripts([newScript, ...scripts]);
      }
      closeModal();
    } catch (e) {
      console.error(e);
    }
  };
  
  const deleteScript = async (script) => {
    try {
      await base44.entities.PrankScript.delete(script.id);
      setScripts(scripts.filter(s => s.id !== script.id));
    } catch (e) {
      console.error(e);
    }
  };
  
  const copyScript = (script) => {
    navigator.clipboard.writeText(script.content);
  };
  
  const openEditModal = (script) => {
    setEditingScript(script);
    setFormData({
      title: script.title || '',
      content: script.content || '',
      category: script.category || 'funny',
      type: script.type || 'call',
      character: script.character || '',
    });
    setShowModal(true);
  };
  
  const closeModal = () => {
    setShowModal(false);
    setEditingScript(null);
    setFormData({
      title: '',
      content: '',
      category: 'funny',
      type: 'call',
      character: '',
    });
  };
  
  const useScript = (script) => {
    window.location.href = createPageUrl(`NewPrank?type=${script.type}`);
  };
  
  const filteredScripts = scripts.filter(s => {
    const matchesSearch = 
      s.title?.toLowerCase().includes(search.toLowerCase()) ||
      s.content?.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === 'all' || s.category === category;
    return matchesSearch && matchesCategory;
  });

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
          
          <h1 className="text-xl font-bold text-white">Script Library</h1>
          
          <Button
            variant="ghost"
            onClick={() => setShowModal(true)}
            className="text-violet-400 hover:text-violet-300 hover:bg-violet-500/10"
          >
            <Plus className="w-5 h-5" />
          </Button>
        </div>
        
        {/* Search & Categories */}
        <div className="space-y-4 mb-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search scripts..."
              className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-white/40 rounded-xl"
            />
          </div>
          
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
        </div>
        
        {/* Scripts List */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 text-violet-400 animate-spin" />
          </div>
        ) : filteredScripts.length === 0 ? (
          <GlassCard className="p-12 text-center">
            <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-8 h-8 text-white/30" />
            </div>
            <h3 className="text-white/80 font-semibold mb-2">No scripts yet</h3>
            <p className="text-white/40 text-sm mb-6">Create your first prank script!</p>
            <NeonButton onClick={() => setShowModal(true)} icon={Plus}>
              Create Script
            </NeonButton>
          </GlassCard>
        ) : (
          <div className="space-y-3">
            {filteredScripts.map((script, i) => {
              const TypeIcon = typeIcons[script.type] || MessageSquare;
              return (
                <motion.div
                  key={script.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <GlassCard className="p-4">
                    <div className="flex items-start gap-4">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${categoryColors[script.category] || categoryColors.custom} flex items-center justify-center flex-shrink-0`}>
                        <TypeIcon className="w-5 h-5 text-white" />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-white truncate">{script.title}</h3>
                          {script.is_premium && (
                            <Crown className="w-4 h-4 text-amber-400" />
                          )}
                        </div>
                        
                        <p className="text-white/50 text-sm line-clamp-2 mb-2">
                          {script.content}
                        </p>
                        
                        <div className="flex items-center gap-3 text-xs text-white/40">
                          <span className="capitalize">{script.category}</span>
                          <span>•</span>
                          <span className="capitalize">{script.type}</span>
                          {script.character && (
                            <>
                              <span>•</span>
                              <span>{script.character}</span>
                            </>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => useScript(script)}
                          className="w-8 h-8 text-emerald-400 hover:text-emerald-300 hover:bg-emerald-500/10"
                        >
                          <Play className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => copyScript(script)}
                          className="w-8 h-8 text-white/40 hover:text-white hover:bg-white/10"
                        >
                          <Copy className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => openEditModal(script)}
                          className="w-8 h-8 text-white/40 hover:text-white hover:bg-white/10"
                        >
                          <Edit2 className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => deleteScript(script)}
                          className="w-8 h-8 text-white/40 hover:text-red-400 hover:bg-red-500/10"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </GlassCard>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
      
      {/* Add/Edit Modal */}
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="bg-slate-900 border-white/10 text-white max-w-md">
          <DialogHeader>
            <DialogTitle>
              {editingScript ? 'Edit Script' : 'Create Script'}
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 mt-4">
            <div>
              <Label className="text-white/70">Title *</Label>
              <Input
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="IRS Audit Call"
                className="mt-1 bg-white/5 border-white/10 text-white"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-white/70">Category</Label>
                <Select 
                  value={formData.category} 
                  onValueChange={(v) => setFormData({ ...formData, category: v })}
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
              
              <div>
                <Label className="text-white/70">Type</Label>
                <Select 
                  value={formData.type} 
                  onValueChange={(v) => setFormData({ ...formData, type: v })}
                >
                  <SelectTrigger className="mt-1 bg-white/5 border-white/10 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-900 border-white/10">
                    <SelectItem value="call">Call</SelectItem>
                    <SelectItem value="text">Text</SelectItem>
                    <SelectItem value="voicemail">Voicemail</SelectItem>
                    <SelectItem value="email">Email</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div>
              <Label className="text-white/70">Recommended Character</Label>
              <Input
                value={formData.character}
                onChange={(e) => setFormData({ ...formData, character: e.target.value })}
                placeholder="IRS Agent"
                className="mt-1 bg-white/5 border-white/10 text-white"
              />
            </div>
            
            <div>
              <Label className="text-white/70">Script Content *</Label>
              <Textarea
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                placeholder="Write your prank script here..."
                className="mt-1 bg-white/5 border-white/10 text-white min-h-[150px]"
              />
            </div>
            
            <div className="flex gap-3 pt-4">
              <Button
                variant="ghost"
                onClick={closeModal}
                className="flex-1 text-white/70 hover:text-white hover:bg-white/10"
              >
                Cancel
              </Button>
              <NeonButton
                onClick={handleSubmit}
                disabled={!formData.title.trim() || !formData.content.trim()}
                className="flex-1"
              >
                {editingScript ? 'Save Changes' : 'Create Script'}
              </NeonButton>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}