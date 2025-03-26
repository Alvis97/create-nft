import React, { useState } from 'react'

function UploadImage() {
    const [ imageUrl, setImageUrl ] = useState<string | null>(null);
    const [ loading, setLoading ] = useState(false);
  
    async function handleUpload() {
      setLoading(true);
      try {
        const res = await fetch("/api/upload", { method: "POST" });
        const data = await res.json();
        if (data.success) {
          setImageUrl(data.imageUrl);
        } else {
          console.error("Upload failed:", data.error);
        } 
      } catch (error) {
        console.error("Error uploading file:", error);
      }
      setLoading(false);
}    
  return (
    <div>
          <h1>Upload Image to Pinata</h1>
      <button onClick={handleUpload} disabled={loading}>
        {loading ? "Uploading..." : "Upload Image"}
      </button>
      {imageUrl && (
        <div>
          <p>Image URL: <a href={imageUrl} target="_blank" rel="noopener noreferrer">{imageUrl}</a></p>
          <img src={imageUrl} alt="Uploaded" width={200} />
        </div>
      )}
    </div>
  )
}

export default UploadImage
