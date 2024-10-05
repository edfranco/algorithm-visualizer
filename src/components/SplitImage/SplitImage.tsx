import React, { useEffect, useRef } from 'react';

const SplitImage: React.FC = () => {
  const leftCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const rightCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const imgSrc = '../../src/assets/spiderman.jpeg'; // Your image path

  useEffect(() => {
    const img = new Image();
    img.src = imgSrc;

    img.onload = function () {
      const imgWidth = img.width / 10;
      const imgHeight = img.height / 10;
      const halfWidth = imgWidth / 2;

      // Get canvas contexts, making sure they are not null
      const leftCanvas = leftCanvasRef.current;
      const rightCanvas = rightCanvasRef.current;

      if (leftCanvas && rightCanvas) {
        const leftCtx = leftCanvas.getContext('2d');
        const rightCtx = rightCanvas.getContext('2d');

        // Set canvas sizes to match the image halves
        leftCanvas.width = halfWidth;
        leftCanvas.height = imgHeight;
        rightCanvas.width = halfWidth;
        rightCanvas.height = imgHeight;

        if (leftCtx && rightCtx) {
          // Draw left half of the image on left canvas
          leftCtx.drawImage(img, 0, 0, halfWidth, imgHeight, 0, 0, halfWidth, imgHeight);

          // Draw right half of the image on right canvas
          rightCtx.drawImage(img, halfWidth, 0, halfWidth, imgHeight, 0, 0, halfWidth, imgHeight);
        }
      }
    };
  }, [imgSrc]);

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <canvas ref={leftCanvasRef} style={{ marginRight: '10px' }}></canvas>
      <canvas ref={rightCanvasRef}></canvas>
    </div>
  );
};

export default SplitImage;
