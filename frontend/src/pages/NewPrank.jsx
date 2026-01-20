import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, ArrowRight, Check, Sparkles, Send, 
  Phone, AlertTriangle, Loader2
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import AnimatedBackground from '@/components/ui/AnimatedBackground';
import GlassCard from '@/components/ui/GlassCard';
import NeonButton from '@/components/ui/NeonButton';
import PlatformSelector, { platforms } from '@/components/prank/PlatformSelector';
import PrankTypeSelector from '@/components/prank/PrankTypeSelector';
import CharacterSelector from '@/components/prank/CharacterSelector';
import ScriptEditor from '@/components/prank/ScriptEditor';
import RecipientInput from '@/components/prank/RecipientInput';
import VoiceRecorder from '@/components/prank/VoiceRecorder';
import CallSimulator from '@/components/prank/CallSimulator';
import { base44 } from '@/api/base44Client';
import { Button } from '@/components/ui/button';

const steps = [
  { id: 'platform', title: 'Choose Platform' },
  { id: 'type', title: 'Prank Type' },
  { id: 'character', title: 'AI Character' },
  { id: 'content', title: 'Script' },
  { id: 'recipient', title: 'Send To' },
];

export default function NewPrank() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showCallSimulator, setShowCallSimulator] = useState(false);
  
  // Prank data
  const [platform, setPlatform] = useState(null);
  const [prankType, setPrankType] = useState('');
  const [character, setCharacter] = useState(null);
  const [script, setScript] = useState('');
  const [recipient, setRecipient] = useState('');
  const [recipientName, setRecipientName] = useState('');
  
  // Parse URL params for quick start
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const type = params.get('type');
    if (type) {
      const phonePlatform = platforms.find(p => p.id === 'phone');
      setPlatform(phonePlatform);
      setPrankType(type === 'voice' ? 'voice_message' : type);
      setCurrentStep(2);
    }
  }, []);
  
  const canProceed = () => {
    switch (currentStep) {
      case 0: return platform !== null;
      case 1: return prankType !== '';
      case 2: return character !== null;
      case 3: return script.trim().length > 0;
      case 4: return recipient.trim().length > 0;
      default: return false;
    }
  };
  
  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };
  
  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      // Simulate faster processing with optimized AI
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // If it's a call, show the simulator
      if (prankType === 'call') {
        setShowCallSimulator(true);
        setIsSubmitting(false);
        return;
      }
      
      // Create the prank record
      const prankData = {
        type: prankType,
        platform: platform?.id,
        recipient,
        recipient_name: recipientName,
        character: character?.name,
        script,
        status: 'completed',
      };
      
      await base44.entities.PrankHistory.create(prankData);
      
      // Show success and redirect
      navigate(createPageUrl('History'));
    } catch (error) {
      console.error('Failed to create prank:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleCallEnd = async ({ duration, transcript }) => {
    setShowCallSimulator(false);
    
    const prankData = {
      type: 'call',
      platform: platform?.id,
      recipient,
      recipient_name: recipientName,
      character: character?.name,
      script,
      duration,
      status: 'answered',
    };
    
    await base44.entities.PrankHistory.create(prankData);
    navigate(createPageUrl('History'));
  };

  return (
    <div className="min-h-screen relative">
      <AnimatedBackground />
      
      <div className="relative z-10 max-w-2xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Link to={createPageUrl('Home')}>
            <Button variant="ghost" className="text-white/70 hover:text-white hover:bg-white/10">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back
            </Button>
          </Link>
          
          <h1 className="text-xl font-bold text-white">New Prank</h1>
          
          <div className="w-24" />
        </div>
        
        {/* Progress Indicator */}
        <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2">
          {steps.map((step, i) => (
            <React.Fragment key={step.id}>
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => i < currentStep && setCurrentStep(i)}
                className={`
                  flex items-center gap-2 px-3 py-2 rounded-full whitespace-nowrap
                  transition-all duration-300 cursor-pointer
                  ${i === currentStep 
                    ? 'bg-violet-500/30 text-violet-300 border border-violet-500/50' 
                    : i < currentStep
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      : 'bg-white/5 text-white/40 border border-white/10'
                  }
                `}
              >
                {i < currentStep ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <span className="w-5 h-5 rounded-full bg-current/20 flex items-center justify-center text-xs">
                    {i + 1}
                  </span>
                )}
                <span className="text-sm">{step.title}</span>
              </motion.div>
              
              {i < steps.length - 1 && (
                <div className={`w-8 h-0.5 ${i < currentStep ? 'bg-emerald-500/50' : 'bg-white/10'}`} />
              )}
            </React.Fragment>
          ))}
        </div>
        
        {/* Step Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            <GlassCard className="p-6 mb-6">
              {/* Step 0: Platform Selection */}
              {currentStep === 0 && (
                <div>
                  <h2 className="text-xl font-bold text-white mb-2">Choose Platform</h2>
                  <p className="text-white/50 mb-6">Select where you want to send your prank</p>
                  <PlatformSelector selected={platform?.id} onSelect={setPlatform} />
                </div>
              )}
              
              {/* Step 1: Prank Type */}
              {currentStep === 1 && (
                <div>
                  <h2 className="text-xl font-bold text-white mb-2">Prank Type</h2>
                  <p className="text-white/50 mb-6">What kind of prank do you want to send?</p>
                  <PrankTypeSelector 
                    availableTypes={platform?.types || []} 
                    selected={prankType} 
                    onSelect={setPrankType} 
                  />
                </div>
              )}
              
              {/* Step 2: Character */}
              {currentStep === 2 && (
                <div>
                  <h2 className="text-xl font-bold text-white mb-2">Choose AI Character</h2>
                  <p className="text-white/50 mb-6">Select who will be calling/messaging</p>
                  <CharacterSelector selected={character} onSelect={setCharacter} />
                </div>
              )}
              
              {/* Step 3: Script/Content */}
              {currentStep === 3 && (
                <div>
                  <h2 className="text-xl font-bold text-white mb-2">Prank Content</h2>
                  <p className="text-white/50 mb-6">Write or generate your prank script</p>
                  
                  {(prankType === 'voice_message' || prankType === 'voicemail') ? (
                    <div className="space-y-6">
                      <ScriptEditor 
                        prankType={prankType}
                        character={character}
                        value={script}
                        onChange={setScript}
                      />
                      <div className="border-t border-white/10 pt-6">
                        <h3 className="text-white/80 font-medium mb-4">Or Record Voice</h3>
                        <VoiceRecorder character={character} onGenerate={console.log} />
                      </div>
                    </div>
                  ) : (
                    <ScriptEditor 
                      prankType={prankType}
                      character={character}
                      value={script}
                      onChange={setScript}
                    />
                  )}
                </div>
              )}
              
              {/* Step 4: Recipient */}
              {currentStep === 4 && (
                <div>
                  <h2 className="text-xl font-bold text-white mb-2">Send To</h2>
                  <p className="text-white/50 mb-6">Enter recipient details</p>
                  
                  <RecipientInput
                    platform={platform?.id}
                    value={recipient}
                    onChange={setRecipient}
                    recipientName={recipientName}
                    onNameChange={setRecipientName}
                  />
                  
                  {/* Disclaimer */}
                  <div className="mt-6 p-4 rounded-xl bg-amber-500/10 border border-amber-500/20">
                    <div className="flex gap-3">
                      <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-amber-200 text-sm font-medium">Prank Responsibly</p>
                        <p className="text-amber-200/60 text-xs mt-1">
                          Only prank people you know who will appreciate the joke. 
                          Do not use this for harassment or illegal purposes.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </GlassCard>
          </motion.div>
        </AnimatePresence>
        
        {/* Navigation Buttons */}
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={handleBack}
            disabled={currentStep === 0}
            className="text-white/70 hover:text-white hover:bg-white/10 disabled:opacity-30"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          
          {currentStep === steps.length - 1 ? (
            <NeonButton
              onClick={handleSubmit}
              disabled={!canProceed() || isSubmitting}
              variant={prankType === 'call' ? 'success' : 'primary'}
              icon={isSubmitting ? Loader2 : prankType === 'call' ? Phone : Send}
            >
              {isSubmitting ? 'Sending...' : prankType === 'call' ? 'Start Call' : 'Send Prank'}
            </NeonButton>
          ) : (
            <NeonButton
              onClick={handleNext}
              disabled={!canProceed()}
              variant="primary"
              icon={ArrowRight}
            >
              Continue
            </NeonButton>
          )}
        </div>
      </div>
      
      {/* Call Simulator */}
      <CallSimulator
        recipient={recipient}
        recipientName={recipientName}
        character={character}
        isActive={showCallSimulator}
        onEnd={handleCallEnd}
      />
    </div>
  );
}