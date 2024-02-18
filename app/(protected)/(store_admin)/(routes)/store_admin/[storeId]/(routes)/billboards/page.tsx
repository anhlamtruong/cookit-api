import { BillboardClient } from "./_components/billboard_client";
import prismaStore from "@/lib/service/prisma_store";
import { format } from "date-fns";
import { BillboardColumn } from "./_components/columns";
import { Suspense } from "react";
import { ClimbingBoxLoader } from "react-spinners";
const BillboardPage = async ({ params }: { params: { storeId: string } }) => {
  const billboards = await prismaStore.billboard.findMany({
    where: { storeId: params.storeId },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedBillboards: BillboardColumn[] = billboards.map((item) => ({
    id: item.id,
    label: item.label,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));
  return (
    <Suspense fallback={<ClimbingBoxLoader />}>
      <div className="flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <BillboardClient data={formattedBillboards}></BillboardClient>
        </div>
      </div>
    </Suspense>
  );
};

export default BillboardPage;
