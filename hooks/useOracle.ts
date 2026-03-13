import { useState, useCallback, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Message, ProphecyEntry, NetworkStatus } from '@/types/oracle';

const INITIAL_MESSAGES: Message[] = [];

const INITIAL_PROPHECIES: ProphecyEntry[] = [];

function getRandomProphecyType(): ProphecyEntry['type'] {
  const rand = Math.random();
  if (rand < 0.2) return 'OMEN';
  if (rand < 0.6) return 'FRAGMENT';
  return 'PROPHECY';
}

function getRandomProphecyNumber(): number {
  return Math.floor(Math.random() * 900) + 100;
}

export function useOracle() {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [prophecies, setProphecies] = useState<ProphecyEntry[]>(INITIAL_PROPHECIES);
  const [isStreaming, setIsStreaming] = useState(false);
  const [currentStreamText, setCurrentStreamText] = useState('');
  const [avatarState, setAvatarState] = useState<'idle' | 'speaking' | 'thinking'>('idle');
  
  const [networkStatus, setNetworkStatus] = useState<NetworkStatus>({
    network: 'MAINNET',
    block: 18945201,
    gas: 20,
    latency: 12,
    integrity: 100,
  });

  const [isLoadingGreeting, setIsLoadingGreeting] = useState(true);

  const generateGreeting = useCallback(async () => {
    try {
      const response = await fetch('/api/oracle', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [],
          userInput: 'Generate a short mystical greeting for a mortal who just entered your realm. Introduce yourself as Siggy in 1-2 sentences. Use emojis.',
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate greeting');
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      if (reader) {
        let accumulatedText = '';
        
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          const chunk = decoder.decode(value);
          accumulatedText += chunk;
        }

        const greetingMessage: Message = {
          id: uuidv4(),
          role: 'oracle',
          content: accumulatedText.trim(),
          timestamp: Date.now(),
        };

        setMessages([greetingMessage]);
        setIsLoadingGreeting(false);
      }
    } catch (error) {
      console.error('Greeting error:', error);
      setIsLoadingGreeting(false);
    }
  }, []);

  // Generate greeting on mount
  useEffect(() => {
    generateGreeting();
  }, [generateGreeting]);

  // Simulate network status updates
  useEffect(() => {
    // Block increments every 12 seconds
    const blockInterval = setInterval(() => {
      setNetworkStatus(prev => ({ ...prev, block: prev.block + 1 }));
    }, 12000);

    // Gas changes every 5 seconds
    const gasInterval = setInterval(() => {
      setNetworkStatus(prev => ({ ...prev, gas: Math.floor(Math.random() * 20) + 15 }));
    }, 5000);

    // Latency changes every 3 seconds
    const latencyInterval = setInterval(() => {
      setNetworkStatus(prev => ({ ...prev, latency: Math.floor(Math.random() * 17) + 8 }));
    }, 3000);

    return () => {
      clearInterval(blockInterval);
      clearInterval(gasInterval);
      clearInterval(latencyInterval);
    };
  }, []);

  const sendMessage = useCallback(async (input: string) => {
    if (!input.trim() || isStreaming) return;

    const userMessage: Message = {
      id: uuidv4(),
      role: 'user',
      content: input.toUpperCase(),
      timestamp: Date.now(),
    };

    setMessages(prev => [...prev, userMessage]);
    setIsStreaming(true);
    setAvatarState('thinking');
    setCurrentStreamText('');

    // Wait 5 seconds in thinking state
    await new Promise(resolve => setTimeout(resolve, 5000));

    try {
      const response = await fetch('/api/oracle', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: messages,
          userInput: input,
        }),
      });

      if (!response.ok) {
        throw new Error('Oracle connection failed');
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      if (reader) {
        let accumulatedText = '';
        
        // Switch to speaking state before streaming
        setAvatarState('speaking');

        while (true) {
          const { done, value } = await reader.read();

          if (done) break;

          const chunk = decoder.decode(value);
          accumulatedText += chunk;
          setCurrentStreamText(accumulatedText);
          
          // Delay for better video visibility (30ms per chunk)
          await new Promise(resolve => setTimeout(resolve, 30));
        }

        const oracleMessage: Message = {
          id: uuidv4(),
          role: 'oracle',
          content: accumulatedText.trim().toUpperCase(),
          timestamp: Date.now(),
        };

        setMessages(prev => [...prev, oracleMessage]);

        // Add to prophecy log
        const prophecyType = getRandomProphecyType();
        const newProphecy: ProphecyEntry = {
          id: uuidv4(),
          type: prophecyType,
          number: getRandomProphecyNumber(),
          text: accumulatedText.trim().toUpperCase(),
        };

        setProphecies(prev => [newProphecy, ...prev].slice(0, 50));
      }
    } catch (error) {
      console.error('Stream error:', error);
      const errorMessage: Message = {
        id: uuidv4(),
        role: 'oracle',
        content: 'CONNECTION TO THE ETHER LOST. RETRY THE RITUAL.',
        timestamp: Date.now(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsStreaming(false);
      setCurrentStreamText('');
      setAvatarState('idle');
    }
  }, [messages, isStreaming]);

  const clearHistory = useCallback(() => {
    setMessages([]);
    setProphecies([]);
  }, []);

  return {
    messages,
    prophecies,
    isStreaming,
    currentStreamText,
    avatarState,
    networkStatus,
    sendMessage,
    clearHistory,
  };
}
