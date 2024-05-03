import { Suspense } from "react";
import { SizeForm } from "./_components/size_form";
import prismaStore from "@/lib/service/prisma_store";
import LoadingOverlay from "@/components/loading_overlay";

const SizePage = async ({ params }: { params: { sizeId: string } }) => {
  let size = null;
  if (params.sizeId !== "new") {
    size = await prismaStore.size.findUnique({
      where: {
        id: params.sizeId,
      },
    });
  }

  return (
    <Suspense fallback={<LoadingOverlay />}>
      <div className=" flex-col">
        <div className=" flex-1 space-y-4 p-8 pt-6">
          <SizeForm initialDataSize={size} />
        </div>
      </div>
    </Suspense>
  );
};

export default SizePage;
