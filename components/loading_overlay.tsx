import React from "react";

import { BeatLoader } from "react-spinners";

interface LoadingOverlayProps {
  message?: string;
}

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ message }) => {
  return (
    <div className="w-full h-full flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-md shadow-md">
        <BeatLoader />
        {message && (
          <p className="text-center mt-4 font-medium">
            {" "}
            {message ?? "Loading..."}{" "}
          </p>
        )}
      </div>
    </div>
  );
};

export default LoadingOverlay;
