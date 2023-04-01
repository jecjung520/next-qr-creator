import React from 'react'
import QRCode from 'qrcode.react'

function QRCodePage({ value }) {
  return (
    <div>
      <h1>QR Code Generator</h1>
      <QRCode value={value} />
    </div>
  )
}

export default QRCodePage
