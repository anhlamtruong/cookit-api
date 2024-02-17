import { CategoryClient } from "./_components/categories_client";
import prismaMySQL from "@/lib/service/prisma_mysql";
import { format } from "date-fns";
import { CategoryColumn } from "./_components/columns";
const CategoriesPage = async ({ params }: { params: { storeId: string } }) => {
  const categories = await prismaMySQL.category.findMany({
    where: { storeId: params.storeId },
    include: {
      billboard: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedCategories: CategoryColumn[] = categories.map((item) => ({
    id: item.id,
    name: item.name,
    billboardLabel: item.billboard.label,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CategoryClient data={formattedCategories}></CategoryClient>
      </div>
    </div>
  );
};

export default CategoriesPage;
