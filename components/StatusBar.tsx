import React from 'react';
import { NetworkStatus } from '@/types/oracle';

interface StatusBarProps {
  networkStatus: NetworkStatus;
}

export function StatusBar({ networkStatus }: StatusBarProps) {
  const { network, block, gas, latency, integrity } = networkStatus;

  return (
    <div className="fixed bottom-0 left-0 right-0 h-8 bg-[#020c09] border-t border-[rgba(0,255,200,0.22)] flex items-center px-4 text-[11px] relative z-50">
      <div className="flex items-center gap-4 w-full">
        <div className="flex items-center gap-2">
          <span className="text-[rgba(160,232,208,0.5)]">NETWORK:</span>
          <span className="text-[#00ffcc] font-semibold">{network}</span>
        </div>
        
        <div className="flex items-center gap-2">
          <span className="text-[rgba(160,232,208,0.5)]">BLOCK:</span>
          <span className="text-[#00ffcc]">{block.toLocaleString()}</span>
        </div>
        
        <div className="flex items-center gap-2">
          <span className="text-[rgba(160,232,208,0.5)]">GAS:</span>
          <span className="text-[#00ffcc]">{gas} GWEI</span>
        </div>
        
        <div className="flex items-center gap-2">
          <span className="text-[rgba(160,232,208,0.5)]">LATENCY:</span>
          <span className="text-[#00ffcc]">{latency} MS</span>
        </div>
        
        <div className="ml-auto flex items-center gap-2">
          <span className="text-[rgba(160,232,208,0.5)]">SYSTEM INTEGRITY:</span>
          <span className="text-[#00ffcc]">{integrity}%</span>
        </div>
      </div>
    </div>
  );
}
