import LoadingOverlay from "@/components/loading_overlay";
import { ChefClient } from "./_components/chef_client";

import { Suspense } from "react";

const ChefPage = async ({ params }: { params: { storeId: string } }) => {
  return (
    <Suspense fallback={<LoadingOverlay />}>
      <div className="flex-col  ">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <ChefClient></ChefClient>
        </div>
      </div>
    </Suspense>
  );
};

export default ChefPage;
