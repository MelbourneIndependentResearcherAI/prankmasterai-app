import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Phone, Mail, AtSign, Search, Plus, Star, Clock } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { base44 } from '@/api/base44Client';

export default function RecipientInput({ platform, value, onChange, recipientName, onNameChange }) {
  const [contacts, setContacts] = useState([]);
  const [showContacts, setShowContacts] = useState(false);
  const [search, setSearch] = useState('');
  
  useEffect(() => {
    loadContacts();
  }, []);
  
  const loadContacts = async () => {
    try {
      const data = await base44.entities.Contact.list('-updated_date', 20);
      setContacts(data);
    } catch (e) {
      console.error(e);
    }
  };
  
  const getPlaceholder = () => {
    switch (platform) {
      case 'phone':
      case 'whatsapp':
        return '+1 (555) 123-4567';
      case 'gmail':
      case 'hotmail':
        return 'example@email.com';
      case 'instagram':
        return '@username';
      case 'tiktok':
        return '@tiktok_user';
      case 'twitter':
        return '@handle';
      case 'facebook':
        return 'Facebook username';
      default:
        return 'Enter recipient...';
    }
  };
  
  const getIcon = () => {
    switch (platform) {
      case 'phone':
      case 'whatsapp':
        return Phone;
      case 'gmail':
      case 'hotmail':
        return Mail;
      default:
        return AtSign;
    }
  };
  
  const Icon = getIcon();
  
  const filteredContacts = contacts.filter(c => 
    c.name?.toLowerCase().includes(search.toLowerCase()) ||
    c.phone?.includes(search) ||
    c.email?.toLowerCase().includes(search.toLowerCase())
  );
  
  const selectContact = (contact) => {
    onNameChange(contact.name);
    
    if (platform === 'phone' || platform === 'whatsapp') {
      onChange(contact.phone || '');
    } else if (platform === 'gmail' || platform === 'hotmail') {
      onChange(contact.email || '');
    } else if (platform === 'instagram') {
      onChange(contact.instagram || '');
    } else if (platform === 'tiktok') {
      onChange(contact.tiktok || '');
    } else if (platform === 'twitter') {
      onChange(contact.twitter || '');
    } else if (platform === 'facebook') {
      onChange(contact.facebook || '');
    }
    
    setShowContacts(false);
  };

  return (
    <div className="space-y-3">
      <div className="flex gap-3">
        <div className="flex-1 relative">
          <Icon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
          <Input
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={getPlaceholder()}
            className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-white/40 rounded-xl"
          />
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowContacts(!showContacts)}
          className="px-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
        >
          <User className="w-5 h-5 text-white/60" />
        </motion.button>
      </div>
      
      <div className="relative">
        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
        <Input
          value={recipientName}
          onChange={(e) => onNameChange(e.target.value)}
          placeholder="Recipient name (optional)"
          className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-white/40 rounded-xl"
        />
      </div>
      
      {/* Contacts Panel */}
      <AnimatePresence>
        {showContacts && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                <Input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search contacts..."
                  className="pl-9 bg-white/5 border-white/10 text-white placeholder:text-white/40 rounded-lg text-sm"
                />
              </div>
              
              <div className="max-h-48 overflow-y-auto space-y-1">
                {filteredContacts.length > 0 ? (
                  filteredContacts.map((contact) => (
                    <button
                      key={contact.id}
                      onClick={() => selectContact(contact)}
                      className="w-full p-3 rounded-xl hover:bg-white/10 transition-colors text-left flex items-center gap-3"
                    >
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center text-white font-bold">
                        {contact.name?.[0]?.toUpperCase() || '?'}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="text-white font-medium truncate">{contact.name}</p>
                          {contact.is_favorite && <Star className="w-3 h-3 text-amber-400 fill-amber-400" />}
                        </div>
                        <p className="text-white/40 text-xs truncate">
                          {contact.phone || contact.email || 'No contact info'}
                        </p>
                      </div>
                      {contact.prank_count > 0 && (
                        <span className="text-xs text-white/30">{contact.prank_count} pranks</span>
                      )}
                    </button>
                  ))
                ) : (
                  <div className="text-center py-6 text-white/40">
                    <User className="w-8 h-8 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">No contacts found</p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}