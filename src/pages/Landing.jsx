import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { 
  Phone, MessageSquare, Mail, Instagram, Zap, 
  CheckCircle, ArrowRight, Play, Sparkles, Star,
  Volume2, Gauge, Heart, Users, Shield, Trophy
} from 'lucide-react';
import AnimatedBackground from '@/components/ui/AnimatedBackground';
import GlassCard from '@/components/ui/GlassCard';
import NeonButton from '@/components/ui/NeonButton';

const features = [
  { 
    icon: Phone, 
    title: 'AI Voice Calls', 
    desc: 'Crystal-clear AI voices that sound 100% real. Your friends won\'t believe it\'s not actually happening.',
    color: 'from-green-500 to-emerald-600'
  },
  { 
    icon: MessageSquare, 
    title: 'Fake Texts & DMs', 
    desc: 'Send pranks via WhatsApp, Instagram, TikTok, Twitter, Facebook. Looks exactly like the real thing.',
    color: 'from-blue-500 to-cyan-600'
  },
  { 
    icon: Mail, 
    title: 'Prank Emails', 
    desc: 'Professional-looking emails from "IRS agents" to "Nigerian princes". Gmail & Hotmail ready.',
    color: 'from-violet-500 to-purple-600'
  },
  { 
    icon: Volume2, 
    title: 'Voice Customization', 
    desc: 'Control pitch, speed, and emotion. Make voices angry, happy, scared - whatever sells the prank.',
    color: 'from-orange-500 to-red-600'
  },
];

const steps = [
  {
    num: '1',
    title: 'Pick Your Platform',
    desc: 'Phone call? Text? Instagram DM? Choose where you want to strike.',
    tip: 'Pro tip: Phone calls are the most convincing for first-timers!'
  },
  {
    num: '2',
    title: 'Choose a Character',
    desc: 'From IRS agents to drunk uncles, celebrity impressions to secret admirers - we\'ve got 20+ voices.',
    tip: 'The "Angry Boss" character gets the best reactions 😂'
  },
  {
    num: '3',
    title: 'Write (or Generate) Your Script',
    desc: 'Use our AI to generate hilarious scripts, or write your own masterpiece. Fine-tune every word.',
    tip: 'Keep it believable but absurd - that\'s the sweet spot'
  },
  {
    num: '4',
    title: 'Customize the Voice',
    desc: 'Adjust pitch, speed, and emotion. Add emphasis to specific phrases for maximum impact.',
    tip: 'A slower speed with angry emotion = instant panic mode'
  },
  {
    num: '5',
    title: 'Send & Watch the Magic',
    desc: 'Hit send and watch your prank unfold. Record their reaction - you\'ll want to watch it again!',
    tip: 'Always be ready to reveal it was a prank. Keep it fun!'
  },
];

const testimonials = [
  {
    name: 'Sarah M.',
    text: 'OMG I pranked my boyfriend with the "Pizza Disaster" call and he actually went outside looking for 47 pizzas 😭💀',
    rating: 5
  },
  {
    name: 'Jake T.',
    text: 'The voice customization is INSANE. Made the IRS agent sound exactly like my dad. My sister freaked out for a solid 10 minutes.',
    rating: 5
  },
  {
    name: 'Emily R.',
    text: 'Best $0 I\'ve ever spent. The Instagram DM prank made my friend think Drake actually messaged them. Pure gold.',
    rating: 5
  },
];

export default function Landing() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <div className="min-h-screen relative overflow-hidden">
      <AnimatedBackground />
      
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center px-4 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.2 }}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-violet-500/20 to-fuchsia-500/20 border border-violet-500/30 text-violet-300 mb-8"
              >
                <Trophy className="w-5 h-5" />
                <span className="font-semibold">The Ultimate Prank Platform of 2026</span>
              </motion.div>
              
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
                Pull Off The Most
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400">
                  Legendary Pranks
                </span>
                <br />
                Ever
              </h1>
              
              <p className="text-xl md:text-2xl text-white/70 mb-4 max-w-2xl mx-auto leading-relaxed">
                Look, we've all been there. You want to prank someone, but it needs to be 
                <span className="text-white font-semibold"> absolutely perfect</span>. 
              </p>
              
              <p className="text-lg text-white/60 mb-10 max-w-2xl mx-auto">
                That's where we come in. AI-powered voices so realistic your friends will think 
                the IRS is actually calling. Texts that look identical to the real app. 
                Emails that'll make them question everything.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
                <Link to={createPageUrl('Home')}>
                  <NeonButton variant="primary" size="xl" icon={Sparkles}>
                    Start Pranking for Free
                  </NeonButton>
                </Link>
                <button className="flex items-center gap-2 px-8 py-4 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold transition-all">
                  <Play className="w-5 h-5" />
                  Watch How It Works
                </button>
              </div>
              
              <div className="flex items-center justify-center gap-8 text-white/40 text-sm">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400" />
                  No credit card needed
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400" />
                  20+ AI characters
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400" />
                  Works on all platforms
                </div>
              </div>
            </motion.div>
          </div>
        </section>
        
        {/* Why This Works Section */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
                Why Your Pranks Will Actually <span className="text-violet-400">Work</span>
              </h2>
              <p className="text-white/60 text-lg">
                Here's the thing - most prank tools suck. They sound robotic, look fake, and fool nobody.
                <br />
                We built this differently.
              </p>
            </motion.div>
            
            <div className="grid md:grid-cols-2 gap-6">
              {features.map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <GlassCard className="p-6 h-full">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4`}>
                      <feature.icon className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                    <p className="text-white/60 leading-relaxed">{feature.desc}</p>
                  </GlassCard>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        {/* How It Works - Human Tutorial */}
        <section className="py-20 px-4 bg-gradient-to-b from-transparent via-violet-950/10 to-transparent">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
                Alright, Let's Pull This Off
              </h2>
              <p className="text-white/60 text-lg">
                Pulling off the perfect prank is an art form. Here's your playbook:
              </p>
            </motion.div>
            
            <div className="space-y-6">
              {steps.map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  onViewportEnter={() => setActiveStep(i)}
                >
                  <GlassCard className={`p-6 transition-all duration-500 ${activeStep === i ? 'ring-2 ring-violet-500/50' : ''}`}>
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-600 flex items-center justify-center flex-shrink-0 text-white font-bold text-xl shadow-lg shadow-violet-500/30">
                        {step.num}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                        <p className="text-white/70 mb-3 leading-relaxed">{step.desc}</p>
                        <div className="flex items-start gap-2 p-3 rounded-lg bg-amber-500/10 border border-amber-500/20">
                          <Sparkles className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                          <p className="text-amber-200/80 text-sm">{step.tip}</p>
                        </div>
                      </div>
                    </div>
                  </GlassCard>
                </motion.div>
              ))}
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-12 text-center"
            >
              <Link to={createPageUrl('Home')}>
                <NeonButton variant="primary" size="lg" icon={ArrowRight}>
                  Got It, Let's Go
                </NeonButton>
              </Link>
            </motion.div>
          </div>
        </section>
        
        {/* Social Proof */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Don't Just Take Our Word For It
              </h2>
              <p className="text-white/60">
                Thousands of successful pranks (and friendships survived) later...
              </p>
            </motion.div>
            
            <div className="grid md:grid-cols-3 gap-6">
              {testimonials.map((test, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <GlassCard className="p-6">
                    <div className="flex gap-1 mb-3">
                      {[...Array(test.rating)].map((_, j) => (
                        <Star key={j} className="w-4 h-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <p className="text-white/80 mb-4 leading-relaxed">"{test.text}"</p>
                    <p className="text-white/40 text-sm font-semibold">- {test.name}</p>
                  </GlassCard>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Final CTA */}
        <section className="py-20 px-4">
          <div className="max-w-2xl mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <GlassCard className="p-8 md:p-12 text-center" gradient>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  Ready to Become a Prank Legend?
                </h2>
                <p className="text-white/70 text-lg mb-8 max-w-xl mx-auto">
                  Join thousands pulling off hilarious pranks every single day. 
                  Your friends won't know what hit them.
                </p>
                
                <Link to={createPageUrl('Home')}>
                  <NeonButton variant="primary" size="xl" icon={Zap}>
                    Start Your First Prank Now
                  </NeonButton>
                </Link>
                
                <div className="flex items-center justify-center gap-6 mt-8 text-white/40 text-sm">
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4" />
                    100% Free
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    10K+ Prankers
                  </div>
                  <div className="flex items-center gap-2">
                    <Heart className="w-4 h-4" />
                    Prank Responsibly
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          </div>
        </section>
        
        {/* Footer */}
        <footer className="py-8 px-4 border-t border-white/10">
          <div className="max-w-4xl mx-auto text-center text-white/30 text-sm space-y-2">
            <p>© 2026 PrankMaster Pro. All Rights Reserved.</p>
            <p>Created and Developed by Michael McNamara, Melbourne, Australia</p>
            <p className="text-white/20 text-xs">
              Use responsibly. Only prank people who appreciate humor. Don't be a jerk.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}