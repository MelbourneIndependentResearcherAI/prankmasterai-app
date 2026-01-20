import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { 
  ArrowLeft, Search, Plus, Star, Phone, Mail, 
  Instagram, Music2, Twitter, Facebook, MessageCircle,
  Edit2, Trash2, User, Loader2, X
} from 'lucide-react';
import AnimatedBackground from '@/components/ui/AnimatedBackground';
import GlassCard from '@/components/ui/GlassCard';
import NeonButton from '@/components/ui/NeonButton';
import { base44 } from '@/api/base44Client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const platformIcons = {
  phone: Phone,
  email: Mail,
  instagram: Instagram,
  tiktok: Music2,
  twitter: Twitter,
  facebook: Facebook,
};

export default function Contacts() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingContact, setEditingContact] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    instagram: '',
    tiktok: '',
    twitter: '',
    facebook: '',
  });
  
  useEffect(() => {
    loadContacts();
  }, []);
  
  const loadContacts = async () => {
    try {
      const data = await base44.entities.Contact.list('-updated_date', 100);
      setContacts(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };
  
  const handleSubmit = async () => {
    try {
      if (editingContact) {
        await base44.entities.Contact.update(editingContact.id, formData);
        setContacts(contacts.map(c => 
          c.id === editingContact.id ? { ...c, ...formData } : c
        ));
      } else {
        const newContact = await base44.entities.Contact.create(formData);
        setContacts([newContact, ...contacts]);
      }
      closeModal();
    } catch (e) {
      console.error(e);
    }
  };
  
  const toggleFavorite = async (contact) => {
    try {
      await base44.entities.Contact.update(contact.id, {
        is_favorite: !contact.is_favorite
      });
      setContacts(contacts.map(c => 
        c.id === contact.id ? { ...c, is_favorite: !c.is_favorite } : c
      ));
    } catch (e) {
      console.error(e);
    }
  };
  
  const deleteContact = async (contact) => {
    try {
      await base44.entities.Contact.delete(contact.id);
      setContacts(contacts.filter(c => c.id !== contact.id));
    } catch (e) {
      console.error(e);
    }
  };
  
  const openEditModal = (contact) => {
    setEditingContact(contact);
    setFormData({
      name: contact.name || '',
      phone: contact.phone || '',
      email: contact.email || '',
      instagram: contact.instagram || '',
      tiktok: contact.tiktok || '',
      twitter: contact.twitter || '',
      facebook: contact.facebook || '',
    });
    setShowModal(true);
  };
  
  const closeModal = () => {
    setShowModal(false);
    setEditingContact(null);
    setFormData({
      name: '',
      phone: '',
      email: '',
      instagram: '',
      tiktok: '',
      twitter: '',
      facebook: '',
    });
  };
  
  const filteredContacts = contacts.filter(c =>
    c.name?.toLowerCase().includes(search.toLowerCase()) ||
    c.phone?.includes(search) ||
    c.email?.toLowerCase().includes(search.toLowerCase())
  );
  
  const favoriteContacts = filteredContacts.filter(c => c.is_favorite);
  const otherContacts = filteredContacts.filter(c => !c.is_favorite);

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
          
          <h1 className="text-xl font-bold text-white">Contacts</h1>
          
          <Button
            variant="ghost"
            onClick={() => setShowModal(true)}
            className="text-violet-400 hover:text-violet-300 hover:bg-violet-500/10"
          >
            <Plus className="w-5 h-5" />
          </Button>
        </div>
        
        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search contacts..."
            className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-white/40 rounded-xl"
          />
        </div>
        
        {/* Contacts List */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 text-violet-400 animate-spin" />
          </div>
        ) : filteredContacts.length === 0 ? (
          <GlassCard className="p-12 text-center">
            <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4">
              <User className="w-8 h-8 text-white/30" />
            </div>
            <h3 className="text-white/80 font-semibold mb-2">No contacts yet</h3>
            <p className="text-white/40 text-sm mb-6">Add contacts for quick pranking!</p>
            <NeonButton onClick={() => setShowModal(true)} icon={Plus}>
              Add Contact
            </NeonButton>
          </GlassCard>
        ) : (
          <div className="space-y-6">
            {/* Favorites */}
            {favoriteContacts.length > 0 && (
              <div>
                <h3 className="text-white/50 text-sm font-medium mb-3 px-1 flex items-center gap-2">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  Favorites
                </h3>
                <div className="space-y-2">
                  {favoriteContacts.map((contact) => (
                    <ContactCard 
                      key={contact.id} 
                      contact={contact}
                      onEdit={() => openEditModal(contact)}
                      onToggleFavorite={() => toggleFavorite(contact)}
                      onDelete={() => deleteContact(contact)}
                    />
                  ))}
                </div>
              </div>
            )}
            
            {/* All Contacts */}
            {otherContacts.length > 0 && (
              <div>
                <h3 className="text-white/50 text-sm font-medium mb-3 px-1">All Contacts</h3>
                <div className="space-y-2">
                  {otherContacts.map((contact) => (
                    <ContactCard 
                      key={contact.id} 
                      contact={contact}
                      onEdit={() => openEditModal(contact)}
                      onToggleFavorite={() => toggleFavorite(contact)}
                      onDelete={() => deleteContact(contact)}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      
      {/* Add/Edit Modal */}
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="bg-slate-900 border-white/10 text-white max-w-md">
          <DialogHeader>
            <DialogTitle>
              {editingContact ? 'Edit Contact' : 'Add Contact'}
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 mt-4">
            <div>
              <Label className="text-white/70">Name *</Label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="John Doe"
                className="mt-1 bg-white/5 border-white/10 text-white"
              />
            </div>
            
            <div>
              <Label className="text-white/70">Phone</Label>
              <Input
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+1 (555) 123-4567"
                className="mt-1 bg-white/5 border-white/10 text-white"
              />
            </div>
            
            <div>
              <Label className="text-white/70">Email</Label>
              <Input
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="john@example.com"
                className="mt-1 bg-white/5 border-white/10 text-white"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-white/70">Instagram</Label>
                <Input
                  value={formData.instagram}
                  onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
                  placeholder="@username"
                  className="mt-1 bg-white/5 border-white/10 text-white"
                />
              </div>
              <div>
                <Label className="text-white/70">TikTok</Label>
                <Input
                  value={formData.tiktok}
                  onChange={(e) => setFormData({ ...formData, tiktok: e.target.value })}
                  placeholder="@username"
                  className="mt-1 bg-white/5 border-white/10 text-white"
                />
              </div>
              <div>
                <Label className="text-white/70">Twitter/X</Label>
                <Input
                  value={formData.twitter}
                  onChange={(e) => setFormData({ ...formData, twitter: e.target.value })}
                  placeholder="@handle"
                  className="mt-1 bg-white/5 border-white/10 text-white"
                />
              </div>
              <div>
                <Label className="text-white/70">Facebook</Label>
                <Input
                  value={formData.facebook}
                  onChange={(e) => setFormData({ ...formData, facebook: e.target.value })}
                  placeholder="username"
                  className="mt-1 bg-white/5 border-white/10 text-white"
                />
              </div>
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
                disabled={!formData.name.trim()}
                className="flex-1"
              >
                {editingContact ? 'Save Changes' : 'Add Contact'}
              </NeonButton>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function ContactCard({ contact, onEdit, onToggleFavorite, onDelete }) {
  const platforms = ['phone', 'email', 'instagram', 'tiktok', 'twitter', 'facebook']
    .filter(p => contact[p]);

  return (
    <GlassCard className="p-4">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-600 flex items-center justify-center text-white text-lg font-bold">
          {contact.name?.[0]?.toUpperCase() || '?'}
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-white truncate">{contact.name}</h3>
            {contact.is_favorite && (
              <Star className="w-4 h-4 fill-amber-400 text-amber-400 flex-shrink-0" />
            )}
          </div>
          
          <div className="flex items-center gap-2 mt-1">
            {platforms.map(p => {
              const Icon = platformIcons[p];
              return Icon ? (
                <Icon key={p} className="w-3 h-3 text-white/40" />
              ) : null;
            })}
            {contact.prank_count > 0 && (
              <span className="text-xs text-white/40 ml-1">{contact.prank_count} pranks</span>
            )}
          </div>
        </div>
        
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleFavorite}
            className="w-8 h-8 text-white/40 hover:text-amber-400 hover:bg-amber-500/10"
          >
            <Star className={`w-4 h-4 ${contact.is_favorite ? 'fill-amber-400 text-amber-400' : ''}`} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={onEdit}
            className="w-8 h-8 text-white/40 hover:text-white hover:bg-white/10"
          >
            <Edit2 className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={onDelete}
            className="w-8 h-8 text-white/40 hover:text-red-400 hover:bg-red-500/10"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </GlassCard>
  );
}