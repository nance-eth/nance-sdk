import React, { useState } from "react";

export default function LoadingBar() {
  const [imageUploading, setImageUploading] = useState(0);

  const loadingBarFileSize = (fileSize: number) => {
    const MIN_INTERVAL = 20;
    const MAX_INTERVAL = 60;
    const MAX_PROGRESS = 100;

    const updateTime = Math.max(
      MIN_INTERVAL,
      Math.min(MAX_INTERVAL, Math.round(fileSize / (10 * 1024)))
    );
    const progressIncrement = 5;
    let progress = 0;

    const interval = setInterval(() => {
      progress += progressIncrement;
      if (progress >= MAX_PROGRESS) {
        setImageUploading(0);
        clearInterval(interval);
      } else {
        setImageUploading(progress);
      }
    }, updateTime);
  };

  return {
    Component: () => (
      <div style={{ height: '2px', backgroundColor: '#4f46e5', width: `${imageUploading}%` }} />
    ),
    loadingBarFileSize
  };
};
