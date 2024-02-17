import { BillboardClient } from "./_components/billboard_client";
import prismaMySQL from "@/lib/service/prisma_mysql";
import { format } from "date-fns";
import { BillboardColumn } from "./_components/columns";
const BillboardPage = async ({ params }: { params: { storeId: string } }) => {
  const billboards = await prismaMySQL.billboard.findMany({
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
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BillboardClient data={formattedBillboards}></BillboardClient>
      </div>
    </div>
  );
};

export default BillboardPage;
