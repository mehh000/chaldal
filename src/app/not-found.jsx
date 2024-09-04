import Image from 'next/image'
import React from 'react'

export default function NotFound() {
  return (
    <div className="flex items-center justify-center w-full h-svh">
      <Image src='/404.png' width={400} height={400} alt='404' />
    </div>
  )
}
