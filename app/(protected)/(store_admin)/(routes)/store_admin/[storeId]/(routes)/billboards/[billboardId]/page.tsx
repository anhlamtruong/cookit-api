import { Suspense } from "react";
import BillboardForm from "./_components/billboard_form";
import prismaStore from "@/lib/service/prisma_store";
import { ClimbingBoxLoader } from "react-spinners";

const BillboardPage = async ({
  params,
}: {
  params: { billboardId: string };
}) => {
  let billboard = null;
  if (params.billboardId !== "new") {
    billboard = await prismaStore.billboard.findUnique({
      where: {
        id: params.billboardId,
      },
    });
  }

  return (
    <Suspense fallback={<ClimbingBoxLoader />}>
      <div className=" flex-col">
        <div className=" flex-1 space-y-4 p-8 pt-6">
          <BillboardForm initialDataBillboard={billboard} />
        </div>
      </div>
    </Suspense>
  );
};

export default BillboardPage;
