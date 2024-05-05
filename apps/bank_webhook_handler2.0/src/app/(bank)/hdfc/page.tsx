import Image from 'next/image'
import React from 'react'

export default function Page() {
  return (
    <div className="flex flex-col items-center gap-4 pt-4">
      <div>
        <Image
          src={'./hdfc.svg'}
          width={400}
          height={90}
          alt="hdfc logo"
        ></Image>
      </div>
      <p className="text-3xl">Welcome to HDFC Bank NetBanking</p>
    </div>
  )
}
