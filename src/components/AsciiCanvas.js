import React, { useEffect, useRef } from "react";

const AsciiCanvas = ({ image, isPaused }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!image) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.src = image;

    img.onload = () => {
      const GRID_SIZE = 64; // Fixed grid size
      const charWidth = canvas.width / GRID_SIZE;
      const charHeight = canvas.height / GRID_SIZE;
      ctx.font = `${charHeight}px monospace`;

      const tempCanvas = document.createElement("canvas");
      const tempCtx = tempCanvas.getContext("2d");
      tempCanvas.width = GRID_SIZE;
      tempCanvas.height = GRID_SIZE;
      tempCtx.drawImage(img, 0, 0, GRID_SIZE, GRID_SIZE);

      const imageData = tempCtx.getImageData(0, 0, GRID_SIZE, GRID_SIZE);
      for (let y = 0; y < GRID_SIZE; y++) {
        for (let x = 0; x < GRID_SIZE; x++) {
          const index = (y * GRID_SIZE + x) * 4;
          const brightness = (imageData.data[index] +
            imageData.data[index + 1] +
            imageData.data[index + 2]) /
            3;
          const asciiChar = "@#&%WM8B$KXD0OLC?!*+=|^~-,.` "[Math.floor((brightness / 255) * 20)];
          ctx.fillText(asciiChar, x * charWidth, y * charHeight);
        }
      }
    };
  }, [image, isPaused]);

  return <canvas ref={canvasRef} width="512" height="512"></canvas>;
};

export default AsciiCanvas;
