"use client"

import "dotenv/config";
import fs from "fs";

import UploadImage from "./components/UploadImage";
import UploadMetadata from "./components/UploadMetadata";
import MintNft from "./components/MintNft";



function page() {
  return (
    <div>
        <UploadImage />
        <UploadMetadata />
        <MintNft/>
    </div>
  )
}

export default page






//     try {
//       const result = await pinata.pinFileToIPF(readableStream, options);
//       console.log("Image uploaded to Pinata", result);
//       return `https://gateway.pinata.cloud/ipfs/${result.IpfsHash}`;
//     } catch (error) {
//       console.log("Error uploading to Pinata", error);
//     }
//   }

//   const arweave = Arweave.init({
//     host: "localhost", // Change this to Arweave's testnet/mainnet if needed
//     port: 1984,
//     protocol: "http",
//     timeout: 20000,
//     logging: false,
//   });

//   const { host, port, protocol } = arweave.getConfig().api;

//   // ✅ Load Image File from Local Storage
//   const data = fs.readFileSync("../src/images/piggy.png");

//   // ✅ Create Arweave Transaction
//   const transaction = await arweave.createTransaction({ data });
//   transaction.addTag("Content-Type", "image/png");

//   // ✅ Load Wallet (Use a pre-existing wallet for persistence)
//   const walletPath = "./code/nfts/upload-arweave/wallet.json";
//   let wallet;
//   if (fs.existsSync(walletPath)) {
//     wallet = JSON.parse(fs.readFileSync(walletPath, "utf-8"));
//   } else {
//     wallet = await arweave.wallets.generate();
//     fs.writeFileSync(walletPath, JSON.stringify(wallet)); // Save for future use
//   }

//   // ✅ Get Wallet Address
//   const address = await arweave.wallets.getAddress(wallet);
//   console.log("Address:", address);

//   // ✅ Mint Tokens (Ensure correct Devnet endpoint)
//   await arweave.api.get(`/mint/${encodeURIComponent(address)}/10000000000000000`);

//   // ✅ Sign & Post Image Transaction
//   await arweave.transactions.sign(transaction, wallet);
//   const response = await arweave.transactions.post(transaction);

//   if (response.status !== 200 && response.status !== 202) {
//     console.error("Error uploading image:", response);
//     return;
//   }

//   // ✅ Get Image URL
//   const imageUrl = `${protocol}://${host}:${port}/${transaction.id}`;
//   console.log("Image URL:", imageUrl);

//   // ✅ Prepare NFT Metadata JSON
//   const metadata = {
//     name: "Custom NFT #1",
//     symbol: "CNFT",
//     description: "A description about my custom NFT #1",
//     seller_fee_basis_points: 500,
//     external_url: "https://www.customnft.com/",
//     attributes: [
//       { trait_type: "NFT type", value: "Custom" },
//     ],
//     collection: {
//       name: "Test Collection",
//       family: "Custom NFTs",
//     },
//     properties: {
//       files: [{ uri: imageUrl, type: "image/png" }],
//       category: "image",
//       maxSupply: 0,
//       creators: [{ address, share: 100 }],
//     },
//     image: imageUrl, // ✅ Store Image URL
//   };

//   // ✅ Upload Metadata to Arweave
//   const metadataTransaction = await arweave.createTransaction({
//     data: JSON.stringify(metadata),
//   });

//   metadataTransaction.addTag("Content-Type", "application/json");

//   await arweave.transactions.sign(metadataTransaction, wallet);
//   const metadataResponse = await arweave.transactions.post(metadataTransaction);

//   if (metadataResponse.status !== 200 && metadataResponse.status !== 202) {
//     console.error("Error uploading metadata:", metadataResponse);
//     return;
//   }

//   // ✅ Get Metadata URL
//   const metadataUrl = `${protocol}://${host}:${port}/${metadataTransaction.id}`;
//   console.log("Metadata URL:", metadataUrl);
// })();


