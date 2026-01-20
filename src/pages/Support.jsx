import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { 
  ArrowLeft, MessageCircle, Send, Loader2, CheckCircle,
  HelpCircle, BookOpen, Zap, Shield
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

const faqs = [
  {
    q: "How do I customize voice pitch and speed?",
    a: "When creating a prank, scroll down to the Voice Customization section. Use the sliders to adjust pitch (0.5x-2.0x) and speed (0.5x-2.0x). You can also select emotional tones like happy, sad, angry, or excited."
  },
  {
    q: "Can I add emphasis to specific phrases?",
    a: "Yes! Use the Advanced Phrase Controls in the script editor. Click to expand it, add phrases, and customize emphasis levels (Soft, Normal, Strong) and emotions for each phrase individually."
  },
  {
    q: "What platforms are supported?",
    a: "PrankMaster Pro supports Phone, WhatsApp, Gmail, Hotmail, Instagram, TikTok, Twitter/X, and Facebook for calls, texts, voicemails, voice messages, emails, and DMs."
  },
  {
    q: "How does the AI voice generation work?",
    a: "Our AI analyzes your script and selected character to generate realistic voice audio. It applies your custom pitch, speed, and emotion settings for ultra-realistic results."
  },
];

export default function Support() {
  const [formData, setFormData] = useState({
    subject: '',
    message: '',
    category: 'general',
    priority: 'medium'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  
  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      await base44.entities.SupportTicket.create(formData);
      setSubmitted(true);
      setTimeout(() => {
        setFormData({ subject: '', message: '', category: 'general', priority: 'medium' });
        setSubmitted(false);
      }, 3000);
    } catch (e) {
      console.error(e);
    } finally {
      setIsSubmitting(false);
    }
  };

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
          
          <h1 className="text-xl font-bold text-white">Support Center</h1>
          
          <div className="w-24" />
        </div>
        
        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <GlassCard className="p-3 text-center">
            <Zap className="w-5 h-5 text-violet-400 mx-auto mb-1" />
            <p className="text-xs text-white/50">24/7 Support</p>
          </GlassCard>
          <GlassCard className="p-3 text-center">
            <MessageCircle className="w-5 h-5 text-emerald-400 mx-auto mb-1" />
            <p className="text-xs text-white/50">AI Assistant</p>
          </GlassCard>
          <GlassCard className="p-3 text-center">
            <Shield className="w-5 h-5 text-blue-400 mx-auto mb-1" />
            <p className="text-xs text-white/50">Guaranteed Help</p>
          </GlassCard>
        </div>
        
        {/* FAQs */}
        <div className="mb-8">
          <h2 className="text-white/80 font-semibold mb-4 flex items-center gap-2">
            <HelpCircle className="w-5 h-5" />
            Frequently Asked Questions
          </h2>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <GlassCard key={i} className="p-4">
                <h3 className="font-semibold text-white mb-2">{faq.q}</h3>
                <p className="text-white/60 text-sm">{faq.a}</p>
              </GlassCard>
            ))}
          </div>
        </div>
        
        {/* Contact Form */}
        <GlassCard className="p-6">
          <h2 className="text-white/80 font-semibold mb-4 flex items-center gap-2">
            <MessageCircle className="w-5 h-5" />
            Submit a Ticket
          </h2>
          
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-8"
            >
              <CheckCircle className="w-12 h-12 text-emerald-400 mx-auto mb-3" />
              <h3 className="text-white font-semibold mb-2">Ticket Submitted!</h3>
              <p className="text-white/60 text-sm">Our AI support team will respond shortly.</p>
            </motion.div>
          ) : (
            <div className="space-y-4">
              <div>
                <Label className="text-white/70">Subject *</Label>
                <Input
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="Brief description of your issue"
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
                      <SelectItem value="general">General</SelectItem>
                      <SelectItem value="technical">Technical</SelectItem>
                      <SelectItem value="bug_report">Bug Report</SelectItem>
                      <SelectItem value="feature_request">Feature Request</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label className="text-white/70">Priority</Label>
                  <Select 
                    value={formData.priority}
                    onValueChange={(v) => setFormData({ ...formData, priority: v })}
                  >
                    <SelectTrigger className="mt-1 bg-white/5 border-white/10 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-900 border-white/10">
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="urgent">Urgent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div>
                <Label className="text-white/70">Message *</Label>
                <Textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Describe your issue in detail..."
                  className="mt-1 bg-white/5 border-white/10 text-white min-h-[120px]"
                />
              </div>
              
              <NeonButton
                onClick={handleSubmit}
                disabled={!formData.subject.trim() || !formData.message.trim() || isSubmitting}
                className="w-full"
                icon={isSubmitting ? Loader2 : Send}
              >
                {isSubmitting ? 'Submitting...' : 'Submit Ticket'}
              </NeonButton>
            </div>
          )}
        </GlassCard>
        
        {/* Copyright */}
        <div className="mt-8 text-center">
          <p className="text-white/30 text-xs">
            © 2024 PrankMaster Pro
          </p>
          <p className="text-white/20 text-xs">
            Created and Developed by Michael McNamara
          </p>
          <p className="text-white/20 text-xs">
            Melbourne, Australia • All Rights Reserved
          </p>
        </div>
      </div>
    </div>
  );
}