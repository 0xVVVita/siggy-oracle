import React from 'react';
import { GlowBorder } from './GlowBorder';

const prophecyFragments = [
  { label: 'PROPHECY FRAGMENT', text: 'THE KNOT WILL BE UNRAVELED.' },
  { label: 'ANCIENT DATA', text: 'CYPHER TEXTS OF THE DEEP WEB.' },
  { label: 'RUNE ECHO', text: 'SEEK THE HIDDEN PATHS.' },
];

interface OracleAvatarProps {
  state?: 'idle' | 'speaking' | 'thinking';
}

export function OracleAvatar({ state = 'idle' }: OracleAvatarProps) {
  // Determine video source based on state
  const getVideoSrc = () => {
    switch (state) {
      case 'speaking':
        return '/cat-speaking.mp4';
      case 'thinking':
        return '/cat-thinking.mp4';
      case 'idle':
      default:
        return '/cat-idle.mp4';
    }
  };

  return (
    <div className="w-[280px] flex flex-col gap-4 p-4">
      {/* Cat Avatar with Mystic Orbit */}
      <div className="relative w-full aspect-square flex items-center justify-center">
        {/* Outer mystic ring */}
        <div className="absolute w-48 h-48 border-2 border-[rgba(0,255,200,0.2)] rounded-full animate-orbit" 
             style={{ animationDuration: '20s' }}>
          <div className="absolute top-0 left-1/2 w-3 h-3 bg-[#00ffcc] rounded-full -translate-x-1/2 -translate-y-1/2 shadow-[0_0_10px_#00ffcc]" />
        </div>
        
        {/* Middle ring with runes */}
        <div className="absolute w-40 h-40 border border-[rgba(0,255,200,0.3)] rounded-full animate-orbit" 
             style={{ animationDuration: '15s', animationDirection: 'reverse' }}>
          <span className="absolute top-2 left-1/2 text-[rgba(0,255,200,0.5)] text-xs -translate-x-1/2">ᚠ</span>
          <span className="absolute bottom-2 left-1/2 text-[rgba(0,255,200,0.5)] text-xs -translate-x-1/2">ᚢ</span>
          <span className="absolute left-2 top-1/2 text-[rgba(0,255,200,0.5)] text-xs -translate-y-1/2">ᚦ</span>
          <span className="absolute right-2 top-1/2 text-[rgba(0,255,200,0.5)] text-xs -translate-y-1/2">ᚨ</span>
        </div>
        
        {/* Inner glow ring */}
        <div className="absolute w-32 h-32 border border-[rgba(0,255,200,0.3)] rounded-full animate-pulse" />
        
        {/* Cat video container - 248x248 static */}
        <div className="relative z-10 w-[248px] h-[248px] bg-gradient-to-br from-[#041410] to-[#020c09] flex items-center justify-center border-2 border-[rgba(0,255,200,0.4)] shadow-[0_0_40px_rgba(0,255,200,0.3)] overflow-hidden">
          <video
            src={getVideoSrc()}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Mystic aura */}
        <div className="absolute inset-0 bg-gradient-to-t from-[rgba(0,255,200,0.15)] to-transparent rounded-full blur-2xl" />
      </div>

      {/* Status */}
      <div className="text-center">
        <div className="text-[11px] text-[#a0e8d0]">
          STATUS: CONNECTED TO RITUAL{' '}
          <span className="inline-block w-2 h-2 bg-[#00ffcc] rounded-full animate-blink ml-1 shadow-[0_0_8px_#00ffcc]" />
        </div>
        <div className="text-[9px] text-[rgba(0,255,200,0.4)] mt-1 uppercase">
          {state === 'speaking' ? 'SPEAKING...' : state === 'thinking' ? 'THINKING...' : 'IDLE'}
        </div>
      </div>

      {/* Prophecy Fragments */}
      <div className="flex flex-col gap-3">
        {prophecyFragments.map((fragment, index) => (
          <GlowBorder key={index} className="p-3 bg-[#04141080] border-[rgba(0,255,200,0.3)]">
            <div className="text-[10px] text-[rgba(0,255,200,0.4)] mb-1">{fragment.label}</div>
            <div className="text-[11px] text-[#a0e8d0] leading-relaxed">{fragment.text}</div>
          </GlowBorder>
        ))}
      </div>
    </div>
  );
}
