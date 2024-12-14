"use client"

import { QRCodeSVG } from "qrcode.react"

export function ProductQRCode({
  productId,
  size,
}: {
  productId: string
  size?: number
}) {
  return (
    <QRCodeSVG
      value={`${window.location.origin}/products/${productId}`}
      size={size || 100}
    />
  )
}
