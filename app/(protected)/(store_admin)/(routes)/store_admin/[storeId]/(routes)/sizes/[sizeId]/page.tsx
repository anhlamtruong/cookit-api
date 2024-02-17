import { SizeForm } from "./_components/size_form";
import prismaMySQL from "@/lib/service/prisma_mysql";

const SizePage = async ({ params }: { params: { sizeId: string } }) => {
  const size = await prismaMySQL.size.findUnique({
    where: {
      id: params.sizeId,
    },
  });
  return (
    <div className=" flex-col">
      <div className=" flex-1 space-y-4 p-8 pt-6">
        <SizeForm initialDataSize={size} />
      </div>
    </div>
  );
};

export default SizePage;
