import React, { useEffect, useRef } from 'react';
import { ProphecyEntry } from '@/types/oracle';
import { GlowBorder } from './GlowBorder';

interface ProphecyLogProps {
  prophecies: ProphecyEntry[];
}

export function ProphecyLog({ prophecies }: ProphecyLogProps) {
  const logEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    logEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [prophecies]);

  const getTypeColor = (type: ProphecyEntry['type']) => {
    switch (type) {
      case 'PROPHECY':
        return '#00ffcc';
      case 'FRAGMENT':
      case 'OMEN':
      default:
        return '#00ffcc';
    }
  };

  const getTypeLabel = (type: ProphecyEntry['type']) => {
    return type.charAt(0) + type.slice(1).toLowerCase();
  };

  return (
    <div className="w-[280px] flex flex-col border-l border-[rgba(0,255,200,0.22)] bg-[#04141080]">
      <div className="p-4 border-b border-[rgba(0,255,200,0.22)]">
        <h2 className="text-[12px] font-bold text-[#00ffcc] tracking-wider flex items-center gap-2">
          <img
            src="/Translucent.png"
            alt="Logo"
            className="w-10 h-10"
            style={{
              filter: 'brightness(0) saturate(100%) invert(60%) sepia(94%) saturate(492%) hue-rotate(105deg) brightness(101%) contrast(101%)'
            }}
          />
          PROPHECY LOG
        </h2>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
        {prophecies.length === 0 ? (
          <div className="text-[11px] text-[rgba(0,255,200,0.4)] text-center py-8">
            NO PROPHECIES RECORDED
          </div>
        ) : (
          prophecies.map((prophecy) => (
            <GlowBorder key={prophecy.id} className="p-3 bg-[#04141080] border-[rgba(0,255,200,0.3)]">
              <div className="flex items-center gap-2 mb-2">
                <span 
                  className="text-[9px] font-bold px-1.5 py-0.5 border border-[rgba(0,255,200,0.25)]"
                  style={{ color: getTypeColor(prophecy.type) }}
                >
                  {getTypeLabel(prophecy.type)}
                </span>
                <span className="text-[9px] text-[rgba(0,255,200,0.5)]">
                  #{String(prophecy.number).padStart(3, '0')}
                </span>
              </div>
              <div 
                className="text-[11px] leading-relaxed uppercase"
                style={{ color: getTypeColor(prophecy.type) }}
              >
                {prophecy.text}
              </div>
            </GlowBorder>
          ))
        )}
        
        <div ref={logEndRef} />
      </div>
    </div>
  );
}
