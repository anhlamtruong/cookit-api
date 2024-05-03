import React, { useState } from "react";
import { motion } from "framer-motion";

interface FirebaseImageUploaderProps {
  progress: number;
  error?: string;
  imageUrl?: string;
}

const FirebaseImageUploader: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploadState, setUploadState] = useState<FirebaseImageUploaderProps>({
    progress: 0,
  });

  const handleUpload = async () => {
    if (!file) return;

    setUploadState({ progress: 0 }); // Reset state

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: file, // Assuming your API route handles raw file data
      });

      if (response.ok) {
        const { imageUrl } = await response.json();
        setUploadState({ progress: 100, imageUrl });
      } else {
        throw new Error("Upload failed");
      }
    } catch (error) {
      setUploadState({ progress: 0, error: "Something wrong" });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      {/* File input with Tailwind CSS styling */}
      <label className="...">
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
        />
      </label>

      {/* Progress and status display */}
      {uploadState.progress > 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mt-4 w-64 bg-gray-200 rounded-full p-2"
        >
          <div
            className="bg-blue-500 text-xs leading-none h-2 text-center text-white rounded-full"
            style={{ width: `${uploadState.progress}%` }}
          >
            {uploadState.progress}%
          </div>
        </motion.div>
      )}

      {/* ... Display the uploaded image if uploadState.imageUrl exists */}
    </div>
  );
};

export default FirebaseImageUploader;
