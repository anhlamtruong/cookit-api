import BillboardForm from "./_components/billboard_form";
import prismaMySQL from "@/lib/service/prisma_mysql";

const BillboardPage = async ({
  params,
}: {
  params: { billboardId: string };
}) => {
  const billboard = await prismaMySQL.billboard.findUnique({
    where: {
      id: params.billboardId,
    },
  });
  return (
    <div className=" flex-col">
      <div className=" flex-1 space-y-4 p-8 pt-6">
        <BillboardForm initialDataBillboard={billboard} />
      </div>
    </div>
  );
};

export default BillboardPage;
