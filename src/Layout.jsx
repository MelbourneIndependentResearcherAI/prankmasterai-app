import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { motion } from 'framer-motion';
import { 
  Home, Phone, History, Users, FileText, 
  Sparkles, Settings
} from 'lucide-react';
import AIAssistant from '@/components/support/AIAssistant';

const navItems = [
  { id: 'Home', icon: Home, label: 'Home' },
  { id: 'NewPrank', icon: Sparkles, label: 'Prank', primary: true },
  { id: 'Community', icon: Users, label: 'Community' },
  { id: 'History', icon: History, label: 'History' },
  { id: 'Scripts', icon: FileText, label: 'Scripts' },
];

export default function Layout({ children, currentPageName }) {
  const showNav = !['NewPrank', 'Landing'].includes(currentPageName);
  
  return (
    <div className="min-h-screen bg-slate-950">
      {children}
      
      {/* AI Assistant */}
      <AIAssistant />
      
      {/* Copyright Footer */}
      <div className="fixed bottom-0 left-0 right-0 z-40 pointer-events-none">
        <div className="max-w-7xl mx-auto px-4 pb-2 text-center">
          <p className="text-white/20 text-xs">
            © 2024 PrankMaster Pro. Created and Developed by Michael McNamara, Melbourne, Australia. All Rights Reserved.
          </p>
        </div>
      </div>
      
      {/* Bottom Navigation */}
      {showNav && (
        <motion.nav
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          className="fixed bottom-0 left-0 right-0 z-50"
        >
          <div className="max-w-lg mx-auto px-4 pb-4">
            <div className="bg-slate-900/90 backdrop-blur-xl border border-white/10 rounded-2xl px-2 py-2 shadow-2xl">
              <div className="flex items-center justify-around">
                {navItems.map((item) => {
                  const isActive = currentPageName === item.id;
                  const Icon = item.icon;
                  
                  if (item.primary) {
                    return (
                      <Link key={item.id} to={createPageUrl(item.id)}>
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="relative -mt-8"
                        >
                          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-600 flex items-center justify-center shadow-lg shadow-violet-500/30">
                            <Icon className="w-6 h-6 text-white" />
                          </div>
                        </motion.div>
                      </Link>
                    );
                  }
                  
                  return (
                    <Link key={item.id} to={createPageUrl(item.id)}>
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`
                          flex flex-col items-center gap-1 px-4 py-2 rounded-xl
                          transition-colors duration-200
                          ${isActive 
                            ? 'text-violet-400' 
                            : 'text-white/40 hover:text-white/60'
                          }
                        `}
                      >
                        <Icon className="w-5 h-5" />
                        <span className="text-xs font-medium">{item.label}</span>
                        {isActive && (
                          <motion.div
                            layoutId="navIndicator"
                            className="absolute -bottom-1 w-1 h-1 rounded-full bg-violet-400"
                          />
                        )}
                      </motion.div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </motion.nav>
      )}
    </div>
  );
}