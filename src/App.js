import React, { useState } from "react";
import { generateHtmlFile, saveHtmlFile } from "./services/HtmlGenerator";
import "./styles/App.css";

const App = () => {
  const [iframeUrl, setIframeUrl] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageSrc = e.target.result;

        // Generate HTML content for the animation
        const htmlContent = generateHtmlFile(imageSrc);

        // Save the HTML file automatically
        saveHtmlFile(htmlContent);

        // Create a blob URL to embed in an iframe
        const blob = new Blob([htmlContent], { type: "text/html" });
        const url = URL.createObjectURL(blob);

        // Update iframe URL to render animation in the app
        setIframeUrl(url);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="app">
      <div className="top-bar">
        <input type="file" accept="image/*" onChange={handleFileChange} />
      </div>
      <div className="animation-container">
        {iframeUrl ? (
          <iframe
            src={iframeUrl}
            title="Generated ASCII Animation"
            style={{ width: "512px", height: "512px", border: "none" }}
          />
        ) : (
          <p>Upload an image to generate ASCII animation.</p>
        )}
      </div>
    </div>
  );
};

export default App;
