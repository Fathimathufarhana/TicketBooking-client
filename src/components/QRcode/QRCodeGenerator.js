
import React, { useRef, useEffect } from 'react';
import QRCode from 'qrcode';

const QRCodeGenerator = ({ value, size = 256 }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current || !value) return;

    QRCode.toCanvas(canvasRef.current, value, { width: size }, (error) => {
      if (error) console.error('Error generating QR code:', error);
    });
  }, [value, size]);

  return (
    <canvas ref={canvasRef} />
  );
};

export default QRCodeGenerator;
