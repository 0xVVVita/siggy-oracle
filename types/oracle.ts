export type MessageRole = 'oracle' | 'user';
export type ProphecyType = 'OMEN' | 'FRAGMENT' | 'PROPHECY';

export interface Message {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: number;
}

export interface ProphecyEntry {
  id: string;
  type: ProphecyType;
  number: number;
  text: string;
}

export interface OracleState {
  messages: Message[];
  prophecies: ProphecyEntry[];
  isStreaming: boolean;
  networkStatus: NetworkStatus;
}

export interface NetworkStatus {
  network: 'MAINNET' | 'TESTNET';
  block: number;
  gas: number;
  latency: number;
  integrity: number;
}
