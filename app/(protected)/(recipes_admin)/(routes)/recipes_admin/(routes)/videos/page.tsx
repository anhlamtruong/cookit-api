import React from "react";

import { Suspense } from "react";
import { VideosClient } from "./_components/videos-client";

const VideosPage: React.FC = ({}) => {
  return (
    <Suspense fallback={<p>Loading videos client...</p>}>
      <VideosClient></VideosClient>
    </Suspense>
  );
};
export default VideosPage;
