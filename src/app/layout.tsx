"use client"
import { ReactNode } from "react";
import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react";
import { WalletModalProvider, WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-wallets";
import { clusterApiUrl } from "@solana/web3.js";
import "@solana/wallet-adapter-react-ui/styles.css"; 
import "./globals.css";

// ✅ Define Props Type
interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  const wallets = [new PhantomWalletAdapter()];

  return (
    <>
      <html lang="en">
      <body>
        <ConnectionProvider endpoint={clusterApiUrl("devnet")}>
          <WalletProvider wallets={wallets} autoConnect>
            <WalletModalProvider >
              <div className="menu" >
                <h1 className="text-xl">N</h1>
                <div>
                <WalletMultiButton className="walletBtn"/> 
                </div>
                </div>
              <main>{children}</main>
            </WalletModalProvider>
          </WalletProvider>
        </ConnectionProvider>
      </body>
    </html>
    </>
  );
}

