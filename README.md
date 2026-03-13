# RITUAL ORACLE SYSTEM V1.0

Mystical AI oracle connected to the Ethereum blockchain.

## Stack

- Next.js 14+ (App Router)
- TypeScript
- Tailwind CSS
- Groq API (llama-3.3-70b-versatile)

## Getting Started

### 1. Set up environment variables

Create a `.env.local` file in the root directory:

```env
GROQ_API_KEY=gsk_your_api_key_here
NEXT_PUBLIC_ORACLE_VERSION=1.0
NEXT_PUBLIC_NETWORK=MAINNET
```

Get your Groq API key from [console.groq.com](https://console.groq.com).

### 2. Install dependencies

```bash
npm install
```

### 3. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Features

- 🐈‍⬛ Oracle Avatar with animated orbit rings
- 💬 Real-time chat with Groq AI streaming
- 🔮 Prophecy Log with dynamic entries
- 📊 Live Ethereum network status simulation
- 🎨 Cyberpunk/crypto oracle design

## Design

- Dark background (`#0a0f0a`)
- Neon green accent (`#00ff88`)
- Font: JetBrains Mono
- Dashed borders, scanline animations

## Project Structure

```
ritual-oracle/
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Main page
│   └── api/oracle/route.ts # Groq API endpoint
├── components/
│   ├── OracleAvatar.tsx    # Left panel with cat
│   ├── ChatWindow.tsx      # Center chat
│   ├── MessageBubble.tsx   # Message component
│   ├── CommandInput.tsx    # Input field
│   ├── ProphecyLog.tsx     # Right panel history
│   ├── StatusBar.tsx       # Bottom status bar
│   └── GlowBorder.tsx      # Reusable border
├── hooks/
│   └── useOracle.ts        # Chat state hook
├── lib/
│   └── groq.ts             # Groq client
├── types/
│   └── oracle.ts           # TypeScript types
└── styles/
    └── globals.css         # Global styles
```

## License

MIT
