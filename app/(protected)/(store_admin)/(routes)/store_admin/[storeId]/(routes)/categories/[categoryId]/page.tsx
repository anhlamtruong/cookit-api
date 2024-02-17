import { CategoryForm } from "./_components/category_form";
import prismaMySQL from "@/lib/service/prisma_mysql";

const CategoryPage = async ({
  params,
}: {
  params: { categoryId: string; storeId: string };
}) => {
  const category = await prismaMySQL.category.findUnique({
    where: {
      id: params.categoryId,
    },
  });
  const billboards = await prismaMySQL.billboard.findMany({
    where: {
      storeId: params.storeId,
    },
  });
  return (
    <div className=" flex-col">
      <div className=" flex-1 space-y-4 p-8 pt-6">
        <CategoryForm
          initialDataCategory={category}
          initialDataBillboards={billboards}
        />
      </div>
    </div>
  );
};

export default CategoryPage;
