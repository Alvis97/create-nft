"use client"

import { useWallet, useConnection } from '@solana/wallet-adapter-react';
import React, { useEffect, useState } from 'react'
import { Metaplex, walletAdapterIdentity } from "@metaplex-foundation/js";

function MintNft() {
    const { connection } = useConnection();
    const { wallet, publicKey, connected } = useWallet();

    const [ metaDataCID, setMetaDataCID ] = useState("");
    const [ nftName, setNftName ] = useState("");
    const [ nftSymbol, setNftSymbol ] = useState("");
    const [ errorMessage, setErrorMessage ] = useState("");

        useEffect(() => {

            if (!connected || !publicKey || !wallet) {
                setErrorMessage("Connect your wallet to start");
                return;
            } else {
                setErrorMessage("");
            }
        }, [connected, publicKey]); //Only run when connected or publickey changes

        //Handle CID input change
        const handleCIDChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            setMetaDataCID(event.target.value);
        };

           //Handle CID input change
           const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            setNftName(event.target.value);
        };

           //Handle CID input change
           const handleSymbolChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            setNftSymbol(event.target.value);
        };

        //Handle Minting
        const handleMintNft = async (event: React.FormEvent) => {
            event.preventDefault();

            if (!connected || !publicKey || !wallet) {
                setErrorMessage("Wallet not Connected");
                return;
            }

            const cidRegex = /^(Qm[1-9A-HJ-NP-Za-km-z]{44,}|bafy[a-zA-Z0-9]{48,})$/;

            if (!metaDataCID) {
                setErrorMessage("This field cant be empty. Pleace enter a CID!");
                return;
            } 

            try {
                console.log("Minting NFT with CID:", metaDataCID);

                //Here is where i add the minting stuff
                const metaplex = Metaplex.make(connection).use(walletAdapterIdentity(wallet.adapter));

                const { nft } = await metaplex.nfts().create({
                    name: nftName,
                    symbol: nftSymbol,
                    uri: `https://gateway.pinata.cloud/ipfs/${metaDataCID}`,
                    sellerFeeBasisPoints: 500,
                    creators: [{ address: publicKey, share: 100}],
                });


                console.log("NFT Successfully minted!");
                console.log("Mint Address (NFT Address):", nft.address.toString());
                setErrorMessage("");
            } catch (error) {
                console.error("Error Minting NFT", error);
                setErrorMessage("Failed to mint NFT, Please try again");
            }
        };
  



  return (
    <div>
        <h1>Mint NFT</h1>
        { errorMessage && <p>{errorMessage}</p>}
        <form onSubmit={handleMintNft}>
            <label htmlFor="cid">Metadata CID</label>
            <input 
            id="cid"
            type="text" 
            placeholder='Enter IPFS CID'
            value={metaDataCID}
            onChange={handleCIDChange}
             />
            <label htmlFor="name">Name your NFT</label>
            <input 
            id="name"
            type="text" 
            placeholder='ex, Prinsess Patty, Simple Donuts..'
            value={nftName}
            onChange={handleNameChange}
             />
            <label htmlFor="symbol">Symbol</label>
            <input 
            id="symbol"
            type="text" 
            placeholder='ex.. NFT'
            value={nftSymbol}
            onChange={handleSymbolChange}
             />
            <button
            type="submit"
            disabled={!connected}
            >Mint NFT </button> 
        </form>
      
    </div>
  )
}

export default MintNft
