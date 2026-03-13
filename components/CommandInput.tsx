import React, { useState, useRef, useEffect } from 'react';

interface CommandInputProps {
  onSend: (input: string) => void;
  disabled: boolean;
}

export function CommandInput({ onSend, disabled }: CommandInputProps) {
  const [input, setInput] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !disabled) {
      onSend(input);
      setInput('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      handleSubmit(e);
    }
  };

  useEffect(() => {
    if (!disabled && inputRef.current) {
      inputRef.current.focus();
    }
  }, [disabled]);

  return (
    <form onSubmit={handleSubmit} className="p-4 border-t border-[rgba(0,255,200,0.22)]">
      <div className="flex gap-3">
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="INPUT CYPHER COMMAND..."
          disabled={disabled}
          className="flex-1 bg-[#04141050] border border-[rgba(0,255,200,0.3)] px-4 py-3 text-[12px] text-[#00ffcc] placeholder-[rgba(0,255,200,0.25)] focus:outline-none focus:border-[#00ffcc] focus:shadow-[0_0_10px_rgba(0,255,200,0.2)] font-mono uppercase disabled:opacity-50 transition-all duration-200"
          autoComplete="off"
        />
        
        <button
          type="submit"
          disabled={disabled || !input.trim()}
          className="w-12 h-12 flex items-center justify-center bg-[#04141080] border border-[rgba(0,255,200,0.3)] hover:border-[#00ffcc] hover:shadow-[0_0_15px_rgba(0,255,200,0.4)] disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200"
        >
          <img
            src="/Translucent.png"
            alt="Send"
            className="w-12 h-12"
            style={{
              filter: 'brightness(0) saturate(100%) invert(60%) sepia(94%) saturate(492%) hue-rotate(105deg) brightness(101%) contrast(101%)'
            }}
          />
        </button>
      </div>
    </form>
  );
}
