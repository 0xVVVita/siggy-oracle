'use client';

import React from 'react';
import { useOracle } from '@/hooks/useOracle';
import { OracleAvatar } from '@/components/OracleAvatar';
import { ChatWindow } from '@/components/ChatWindow';
import { CommandInput } from '@/components/CommandInput';
import { ProphecyLog } from '@/components/ProphecyLog';
import { StatusBar } from '@/components/StatusBar';

export default function OraclePage() {
  const {
    messages,
    prophecies,
    isStreaming,
    currentStreamText,
    networkStatus,
    sendMessage,
    isLoadingGreeting,
    avatarState,
  } = useOracle();

  return (
    <div className="h-screen w-screen flex flex-col bg-[#020c09] relative">
      {/* Fog layers */}
      <div className="fog-layer" />
      
      {/* Main Content - offset for fixed header (h-14 = 56px) */}
      <div className="flex-1 flex overflow-hidden pt-14 pb-8 relative z-10">
        {/* Left Panel - Oracle Avatar */}
        <OracleAvatar state={avatarState} />

        {/* Center Panel - Chat */}
        <div className="flex-1 flex flex-col border-x border-[rgba(0,255,200,0.22)]">
          {isLoadingGreeting && messages.length === 0 ? (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <img
                  src="/Translucent.png"
                  alt="Ritual Oracle Logo"
                  className="w-[300px] h-[300px] mx-auto mb-4 rune-glow"
                  style={{
                    filter: 'brightness(0) saturate(100%) invert(60%) sepia(94%) saturate(492%) hue-rotate(105deg) brightness(101%) contrast(101%)'
                  }}
                />
                <div className="text-[#a0e8d0] text-sm animate-pulse">SUMMONING SIGGY...</div>
              </div>
            </div>
          ) : (
            <ChatWindow
              messages={messages}
              isStreaming={isStreaming}
              currentStreamText={currentStreamText}
            />
          )}
          <CommandInput onSend={sendMessage} disabled={isStreaming} />
        </div>

        {/* Right Panel - Prophecy Log */}
        <ProphecyLog prophecies={prophecies} />
      </div>

      {/* Bottom Status Bar */}
      <StatusBar networkStatus={networkStatus} />
    </div>
  );
}
