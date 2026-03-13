import React from 'react';
import { Message } from '@/types/oracle';

interface MessageBubbleProps {
  message: Message;
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const isOracle = message.role === 'oracle';

  const borderColor = isOracle ? 'rgba(0,255,200,0.35)' : '#3d5a4a';
  const textColor = isOracle ? '#00ffcc' : '#a0e8d0';
  const icon = isOracle ? (
    <img
      src="/Translucent.png"
      alt="Siggy"
      className="w-8 h-8"
      style={{
        filter: 'brightness(0) saturate(100%) invert(60%) sepia(94%) saturate(492%) hue-rotate(105deg) brightness(101%) contrast(101%)'
      }}
    />
  ) : null;

  const prefix = isOracle ? '[SIGGY]:' : '[USER]:';

  if (isOracle) {
    // Oracle message - left side
    return (
      <div className="flex items-start gap-2 mb-3 animate-fade-in w-full">
        <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center mt-0.5">
          {icon}
        </div>
        <div
          className="max-w-[80%] p-3 rounded border animate-fade-in"
          style={{
            borderStyle: 'solid',
            borderWidth: '1px',
            borderColor: borderColor,
            backgroundColor: 'rgba(0, 255, 200, 0.05)',
          }}
        >
          <div
            className="text-[10px] mb-1 font-bold"
            style={{ color: '#00ffcc' }}
          >
            {prefix}
          </div>
          <div
            className="text-[11px] uppercase leading-relaxed"
            style={{ color: textColor }}
          >
            {message.content}
          </div>
          <div
            className="text-[9px] mt-2 text-[rgba(0,255,200,0.25)]"
            suppressHydrationWarning={true}
          >
            {new Date(message.timestamp).toLocaleTimeString()}
          </div>
        </div>
      </div>
    );
  } else {
    // User message - right side
    return (
      <div className="flex items-start gap-2 mb-3 animate-fade-in w-full justify-end">
        <div
          className="max-w-[80%] p-3 rounded border animate-fade-in"
          style={{
            borderStyle: 'solid',
            borderWidth: '1px',
            borderColor: borderColor,
            backgroundColor: 'rgba(74, 122, 90, 0.05)',
          }}
        >
          <div
            className="text-[10px] mb-1 font-bold text-right"
            style={{ color: '#6a8a7a' }}
          >
            {prefix}
          </div>
          <div
            className="text-[11px] uppercase leading-relaxed"
            style={{ color: textColor }}
          >
            {message.content}
          </div>
          <div
            className="text-[9px] mt-2 text-[rgba(0,255,200,0.25)] text-right"
            suppressHydrationWarning={true}
          >
            {new Date(message.timestamp).toLocaleTimeString()}
          </div>
        </div>
      </div>
    );
  }
}
