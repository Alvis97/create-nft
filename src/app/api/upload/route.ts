//Code for uploading Image

// import { NextResponse } from "next/server";
// import "dotenv/config";
// import fs from "fs";
// import pinataSDK from "@pinata/sdk";
// import path from "path";

// const pinata = new pinataSDK(process.env.PINATA_API_KEY, process.env.PINATA_SECRET_API_KEY);

// export async function POST() {
//   try {
//     const filePath = path.resolve("./src/app/images/nft.png"); 
//     const readableStream = fs.createReadStream(filePath);

//     const options: {
//       pinataMetadata: { name: string },
//       pinataOptions: { cidVersion: 0 | 1 | undefined };
//     } = {
//         pinataMetadata: { name: "NftImage" },
//         pinataOptions: { cidVersion: 1 },
//     };

//     const result = await pinata.pinFileToIPFS(readableStream, options);
//     console.log("Pinned Image CID:", result.IpfsHash);
//     return NextResponse.json({ success: true, imageUrl: `https://gateway.pinata.cloud/ipfs/${result.IpfsHash}` });
//   } catch (error: any) {
//     console.error("Pinata Upload Error:", error);
//     return NextResponse.json({ success: false, error: error.message });
//   }
// }

//Code for uploading metadata

import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";
import pinataSDK from "@pinata/sdk";
import "dotenv/config";

// ✅ Initialize Pinata SDK
const pinata = new pinataSDK(process.env.PINATA_API_KEY, process.env.PINATA_SECRET_API_KEY);

export async function POST() {
  try {

    // ✅ Save metadata as a temporary file
    const metadataPath = path.join(process.cwd(), "public/metadata.json");
    
    if (!fs.existsSync(metadataPath)) {
       return NextResponse.json({ success: false, error: "metadata.json not found"}, { status: 404 });
    }

    // ✅ Upload metadata.json to Pinata
    const readableStream = fs.createReadStream(metadataPath);

    const options : { 
        pinataMetadata: { name: string },
         pinataOptions: { cidVersion: 0 | 1 | undefined } 
        } = {
            pinataMetadata: { name: "NFT_Metadata" },
            pinataOptions: { cidVersion: 1 } 
        };
    const result = await pinata.pinFileToIPFS(readableStream, options);

    fs.unlinkSync(metadataPath); // ✅ Delete temp file after upload

    console.log("Metadata CID:", result.IpfsHash);

    return NextResponse.json({ success: true, metadataCID: result.IpfsHash });
  } catch (error: any) {
    console.error("Pinata Upload Error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
