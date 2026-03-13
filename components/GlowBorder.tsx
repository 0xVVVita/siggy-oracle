import React from 'react';

interface GlowBorderProps {
  children: React.ReactNode;
  className?: string;
  dashed?: boolean;
  glow?: boolean;
  mystic?: boolean;
}

export function GlowBorder({ 
  children, 
  className = '', 
  dashed = true,
  glow = false,
  mystic = true 
}: GlowBorderProps) {
  const borderStyle = dashed ? 'border-dashed' : 'border-solid';
  const borderColor = mystic ? 'border-[rgba(0,255,200,0.3)]' : 'border-[rgba(0,255,200,0.22)]';
  const glowClass = glow ? 'shadow-[0_0_10px_rgba(0,255,200,0.3)]' : '';
  
  return (
    <div 
      className={`border ${borderColor} ${borderStyle} ${glowClass} ${className}`}
    >
      {children}
    </div>
  );
}
