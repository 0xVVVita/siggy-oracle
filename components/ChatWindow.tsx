import React, { useEffect, useRef } from 'react';
import { Message } from '@/types/oracle';
import { MessageBubble } from './MessageBubble';

interface ChatWindowProps {
  messages: Message[];
  isStreaming: boolean;
  currentStreamText: string;
}

export function ChatWindow({ messages, isStreaming, currentStreamText }: ChatWindowProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isStreaming, currentStreamText]);

  return (
    <div className="flex-1 relative overflow-hidden">
      {/* Mystic Watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.02]">
        <img
          src="/Translucent.png"
          alt="Ritual Oracle Logo"
          className="w-full h-full object-contain rune-glow"
          style={{
            filter: 'brightness(0) saturate(100%) invert(60%) sepia(94%) saturate(492%) hue-rotate(105deg) brightness(101%) contrast(101%)'
          }}
        />
      </div>

      {/* Messages */}
      <div className="h-full overflow-y-auto p-6 relative z-10">
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}

        {/* Streaming message */}
        {isStreaming && (
          <div className="flex items-start gap-2 mb-3 animate-fade-in">
            <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center mt-0.5">
              <img
                src="/Translucent.png"
                alt="Siggy"
                className="w-8 h-8"
                style={{
                  filter: 'brightness(0) saturate(100%) invert(60%) sepia(94%) saturate(492%) hue-rotate(105deg) brightness(101%) contrast(101%)'
                }}
              />
            </div>
            
            <div 
              className="max-w-[80%] p-3 rounded border"
              style={{ 
                borderStyle: 'solid',
                borderWidth: '1px',
                borderColor: 'rgba(0,255,200,0.35)',
                backgroundColor: 'rgba(0, 255, 200, 0.05)',
              }}
            >
              <div className="text-[10px] mb-1 font-bold text-[#00ffcc]">
                [SIGGY]:
              </div>
              <div className="text-[11px] uppercase leading-relaxed text-[#00ffcc]">
                {currentStreamText}
                <span className="inline-block w-2 h-4 bg-[#00ffcc] ml-1 animate-blink" />
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>
    </div>
  );
}
