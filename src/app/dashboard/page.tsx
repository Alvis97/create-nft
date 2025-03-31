"use client"

import { useRouter } from 'next/navigation'
import React from 'react'

//Style
import DashboardStyle from "../styles/dashboard.module.scss"

function page() {
  const router = useRouter();
  return (
    <div className={DashboardStyle.div}>
      <button onClick={() => router.push("./uploadImage")}>1. Upload Image</button>
      <button onClick={() => router.push("./uploadMetadata")}>2. Upload Metadata</button>
      <button onClick={() => router.push("./mint")}>3. Mint NFT</button>
    </div>
  )
}

export default page
