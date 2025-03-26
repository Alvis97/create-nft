"use client"
import { ReactNode } from "react";
import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react";
import { WalletModalProvider, WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-wallets";
import { clusterApiUrl } from "@solana/web3.js";
import "@solana/wallet-adapter-react-ui/styles.css"; // Ensure styles are imported

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
            <WalletModalProvider>
              <header className="p-4 flex justify-between items-center bg-gray-900 text-white">
                <h1 className="text-xl">My Solana App</h1>
                <WalletMultiButton /> {/* ✅ Connect Wallet Button */}
              </header>
              <main>{children}</main>
            </WalletModalProvider>
          </WalletProvider>
        </ConnectionProvider>
      </body>
    </html>
    </>
  );
}

