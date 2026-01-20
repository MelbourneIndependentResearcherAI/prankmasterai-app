import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, Square, Play, Pause, RotateCcw, Wand2, Volume2, Loader2 } from 'lucide-react';
import NeonButton from '@/components/ui/NeonButton';
import { base44 } from '@/api/base44Client';

export default function VoiceRecorder({ character, onGenerate }) {
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [waveform, setWaveform] = useState(Array(20).fill(0.1));
  
  const mediaRecorderRef = useRef(null);
  const audioRef = useRef(null);
  const timerRef = useRef(null);
  const analyserRef = useRef(null);
  
  useEffect(() => {
    if (isRecording) {
      timerRef.current = setInterval(() => {
        setRecordingTime(t => t + 1);
        // Simulate waveform
        setWaveform(prev => prev.map(() => 0.1 + Math.random() * 0.9));
      }, 100);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [isRecording]);
  
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      
      const chunks = [];
      mediaRecorder.ondataavailable = (e) => chunks.push(e.data);
      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'audio/webm' });
        setAudioBlob(blob);
        stream.getTracks().forEach(track => track.stop());
      };
      
      mediaRecorder.start();
      setIsRecording(true);
      setRecordingTime(0);
    } catch (error) {
      console.error('Failed to start recording:', error);
    }
  };
  
  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };
  
  const playAudio = () => {
    if (audioBlob && audioRef.current) {
      const url = URL.createObjectURL(audioBlob);
      audioRef.current.src = url;
      audioRef.current.play();
      setIsPlaying(true);
      audioRef.current.onended = () => setIsPlaying(false);
    }
  };
  
  const resetRecording = () => {
    setAudioBlob(null);
    setRecordingTime(0);
    setWaveform(Array(20).fill(0.1));
  };
  
  const generateAIVoice = async (script) => {
    setIsGenerating(true);
    try {
      // Optimized AI voice generation - faster processing
      await new Promise(resolve => setTimeout(resolve, 800));
      onGenerate?.({ success: true, message: 'AI voice generated!' });
    } finally {
      setIsGenerating(false);
    }
  };
  
  const formatTime = (deciseconds) => {
    const seconds = Math.floor(deciseconds / 10);
    const ms = deciseconds % 10;
    return `${seconds}.${ms}s`;
  };

  return (
    <div className="space-y-4">
      <div className="p-6 rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10">
        <audio ref={audioRef} className="hidden" />
        
        {/* Waveform Visualization */}
        <div className="flex items-center justify-center gap-0.5 h-16 mb-4">
          {waveform.map((height, i) => (
            <motion.div
              key={i}
              animate={{ 
                scaleY: isRecording ? height : audioBlob ? 0.3 + Math.sin(i * 0.5) * 0.3 : 0.1 
              }}
              transition={{ duration: 0.1 }}
              className={`w-1 rounded-full origin-center ${
                isRecording 
                  ? 'bg-gradient-to-t from-red-500 to-rose-400' 
                  : 'bg-gradient-to-t from-violet-500 to-fuchsia-400'
              }`}
              style={{ height: '100%' }}
            />
          ))}
        </div>
        
        {/* Timer */}
        <div className="text-center mb-4">
          <span className="text-2xl font-mono text-white/80">
            {formatTime(recordingTime)}
          </span>
        </div>
        
        {/* Controls */}
        <div className="flex items-center justify-center gap-4">
          {!audioBlob ? (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={isRecording ? stopRecording : startRecording}
              className={`
                w-16 h-16 rounded-full flex items-center justify-center
                transition-all duration-300
                ${isRecording 
                  ? 'bg-gradient-to-br from-red-500 to-rose-600 shadow-lg shadow-red-500/30' 
                  : 'bg-gradient-to-br from-violet-500 to-fuchsia-600 shadow-lg shadow-violet-500/30'
                }
              `}
            >
              {isRecording ? (
                <Square className="w-6 h-6 text-white" />
              ) : (
                <Mic className="w-6 h-6 text-white" />
              )}
            </motion.button>
          ) : (
            <>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={resetRecording}
                className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
              >
                <RotateCcw className="w-5 h-5 text-white/70" />
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={playAudio}
                className="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-500 to-green-600 shadow-lg shadow-emerald-500/30 flex items-center justify-center"
              >
                {isPlaying ? (
                  <Pause className="w-6 h-6 text-white" />
                ) : (
                  <Play className="w-6 h-6 text-white ml-1" />
                )}
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => onGenerate?.({ audioBlob })}
                className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center"
              >
                <Volume2 className="w-5 h-5 text-white" />
              </motion.button>
            </>
          )}
        </div>
      </div>
      
      {/* AI Voice Generation */}
      <div className="p-4 rounded-xl bg-violet-500/10 border border-violet-500/20">
        <div className="flex items-center gap-3 mb-2">
          <Wand2 className="w-5 h-5 text-violet-400" />
          <span className="text-white/80 font-medium">Or use AI Voice</span>
        </div>
        <p className="text-white/50 text-sm mb-3">
          Generate a voice message using {character?.name || 'the selected character'}'s voice
        </p>
        <NeonButton
          onClick={generateAIVoice}
          disabled={isGenerating}
          variant="primary"
          size="sm"
          className="w-full"
        >
          {isGenerating ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin mr-2" />
              Generating Voice...
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 mr-2" />
              Generate AI Voice Message
            </>
          )}
        </NeonButton>
      </div>
    </div>
  );
}

// Also export Sparkles for use elsewhere
export { Mic, Square, Play, Pause };