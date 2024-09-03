import Image from 'next/image'
import React from 'react'

export default function Loading() {
  return (
    <div className="flex items-center justify-center w-full h-svh">
      <Image src='/loading.gif' width={100} height={200} />
    </div>
  )
}
