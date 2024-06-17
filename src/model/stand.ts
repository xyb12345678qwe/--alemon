import React, { CSSProperties } from 'react'
export function Strand(now: number, max: number) {
  const num = Math.floor((Math.abs(now || 0) / max) * 100)
  const numWithSign = now < 0 ? -num : num
  const style: CSSProperties = { width: `${num}%` }

  return { style, num: numWithSign }
}
