import { ChefClient } from "./_components/chef_client";

import { Suspense } from "react";
import { ClimbingBoxLoader } from "react-spinners";
const ChefPage = async ({ params }: { params: { storeId: string } }) => {
  return (
    <Suspense fallback={<ClimbingBoxLoader />}>
      <div className="flex-col  ">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <ChefClient></ChefClient>
        </div>
      </div>
    </Suspense>
  );
};

export default ChefPage;
