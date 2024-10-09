import {  sepolia } from "@reown/appkit/networks";
import { createAppKit } from "@reown/appkit-solana/react";
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";
import {  solanaDevnet } from "@reown/appkit/networks";
import { SolanaAdapter } from "@reown/appkit-adapter-solana/react";
import { PhantomWalletAdapter, SolflareWalletAdapter } from "@solana/wallet-adapter-wallets";
import React from "react";
import { WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// General setup

// 1. Get projectId from https://cloud.reown.com
const projectId = import.meta.env.VITE_APP_WC_PROJECT_ID; // Enter projectId here

export const networks =  [solanaDevnet, sepolia];

// Ethereum Wallet Setup

// 0. Setup queryClient
const queryClient = new QueryClient();

// 3. Create Wagmi Adapter
const wagmiAdapter = new WagmiAdapter({
  ssr: true,
  networks,
  projectId,
});

// Solana wallet setup

// 0. Set up Solana Adapter
const solanaWeb3JsAdapter = new SolanaAdapter({
  wallets: [new PhantomWalletAdapter(), new SolflareWalletAdapter()],
});

// 2. Create a metadata object - optional
const metadata = {
  name: "Example",
  description: "Example App",
  url: "example.com", // origin must match your domain & subdomain
  icons: [],
};

// 4. Create modal
createAppKit({
  adapters: [wagmiAdapter, solanaWeb3JsAdapter],
  networks: networks,
  metadata,
  projectId,
  features: {
    analytics: true, // Optional - defaults to your Cloud configuration
  },
});

export function AppKitProvider({ children }: { children: React.ReactNode | React.ReactNode[] }) {
  return (
    <WagmiProvider config={wagmiAdapter.wagmiConfig}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}
