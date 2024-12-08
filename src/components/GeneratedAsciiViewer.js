import React, { useState } from "react";

const GeneratedAsciiViewer = ({ htmlContent }) => {
  const [iframeUrl, setIframeUrl] = useState("");

  const handleViewHtml = () => {
    const blob = new Blob([htmlContent], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    setIframeUrl(url);
  };

  return (
    <div>
      <button onClick={handleViewHtml}>View Generated Animation</button>
      {iframeUrl && (
        <iframe
          src={iframeUrl}
          style={{
            width: "512px",
            height: "512px",
            border: "1px solid white",
            marginTop: "10px",
          }}
          title="Generated ASCII Animation"
        />
      )}
    </div>
  );
};

export default GeneratedAsciiViewer;
