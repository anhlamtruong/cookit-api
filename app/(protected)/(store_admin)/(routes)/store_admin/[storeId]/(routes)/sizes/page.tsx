import { format } from "date-fns";
import prismaStore from "@/lib/service/prisma_store";
import { SizeColumn } from "./_components/columns";
import { SizesClient } from "./_components/sizes_client";
import { Suspense } from "react";
import LoadingOverlay from "@/components/loading_overlay";

const SizesPage = async ({ params }: { params: { storeId: string } }) => {
  const sizes = await prismaStore.size.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedSizes: SizeColumn[] = sizes.map((item) => ({
    id: item.id,
    name: item.name,
    value: item.quantity,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));

  return (
    <Suspense fallback={<LoadingOverlay />}>
      <div className="flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <SizesClient data={formattedSizes} />
        </div>
      </div>
    </Suspense>
  );
};

export default SizesPage;
