"use client";
import React, { useState } from "react";

function UploadMetadata() {
  const [metadataCID, setMetadataCID] = useState("");

  async function handleUpload2() {
    try {
      const response = await fetch("/api/upload", { method: "POST" });
      const data = await response.json();
      
      if (data.success) {
        setMetadataCID(data.metadataCID);
      } else {
        console.error("Upload failed:", data.error);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Upload NFT Metadata</h1>
      <button
        onClick={handleUpload2}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
      >
        Upload Metadata
      </button>
      
      {metadataCID && (
        <p className="mt-4">
          ✅ Metadata uploaded:{" "}
          <a
            href={`https://gateway.pinata.cloud/ipfs/${metadataCID}`}
            target="_blank"
            className="text-blue-600 underline"
          >
            View on IPFS
          </a>
        </p>
      )}
    </div>
  );
}

export default UploadMetadata;

