export function generateHtmlFile(image) {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Generated ASCII Animation</title>
      <style>
        body {
          margin: 0;
          background: black;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
        }
        canvas {
          display: block;
        }
      </style>
    </head>
    <body>
      <canvas id="asciiCanvas" width="512" height="512"></canvas>
      <script>
        (function() {
          const ASCII_SET = "@#&%WM8B$KXD0OLC?!*+=|^~-,.\` ";
          const canvas = document.getElementById('asciiCanvas');
          const ctx = canvas.getContext('2d');
          const img = new Image();
          img.src = "${image}";
  
          let frameCounter = 0;
          const FRAME_DELAY = 200;
  
          img.onload = function() {
            const GRID_SIZE = 64;
            const charWidth = canvas.width / GRID_SIZE;
            const charHeight = canvas.height / GRID_SIZE;
            ctx.font = charHeight + 'px monospace';
  
            const tempCanvas = document.createElement('canvas');
            const tempCtx = tempCanvas.getContext('2d');
            tempCanvas.width = GRID_SIZE;
            tempCanvas.height = GRID_SIZE;
            tempCtx.drawImage(img, 0, 0, GRID_SIZE, GRID_SIZE);
  
            const imageData = tempCtx.getImageData(0, 0, GRID_SIZE, GRID_SIZE).data;
  
            function renderAsciiFrame() {
              ctx.clearRect(0, 0, canvas.width, canvas.height);
              for (let y = 0; y < GRID_SIZE; y++) {
                for (let x = 0; x < GRID_SIZE; x++) {
                  const index = (y * GRID_SIZE + x) * 4;
                  const r = imageData[index];
                  const g = imageData[index + 1];
                  const b = imageData[index + 2];
                  const brightness = (r + g + b) / 3;
  
                  const asciiIndex =
                    (Math.floor((brightness / 255) * (ASCII_SET.length - 1)) + frameCounter) %
                    ASCII_SET.length;
                  const asciiChar = ASCII_SET[asciiIndex];
  
                  ctx.fillStyle = \`rgb(\${r}, \${g}, \${b})\`;
                  ctx.fillText(asciiChar, x * charWidth, y * charHeight);
                }
              }
              frameCounter++;
              setTimeout(() => requestAnimationFrame(renderAsciiFrame), FRAME_DELAY);
            }
  
            renderAsciiFrame();
          };
  
          img.onerror = function() {
            console.error("Failed to load the image. Please check the source.");
          };
        })();
      </script>
    </body>
    </html>
    `;
  }
  
  export function saveHtmlFile(content) {
    const blob = new Blob([content], { type: "text/html" });
    const url = URL.createObjectURL(blob);
  
    const link = document.createElement("a");
    link.href = url;
    link.download = "ascii_animation.html";
    link.click();
  }
  