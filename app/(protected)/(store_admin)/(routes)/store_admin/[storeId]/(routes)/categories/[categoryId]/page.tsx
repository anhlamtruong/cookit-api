import { Suspense } from "react";
import { CategoryForm } from "./_components/category_form";
import prismaStore from "@/lib/service/prisma_store";
import { ClimbingBoxLoader } from "react-spinners";
import LoadingOverlay from "@/components/loading_overlay";

const CategoryPage = async ({
  params,
}: {
  params: { categoryId: string; storeId: string };
}) => {
  let category = null;
  if (params.categoryId !== "new") {
    category = await prismaStore.category.findUnique({
      where: {
        id: params.categoryId,
      },
    });
  }

  const billboards = await prismaStore.billboard.findMany({
    where: {
      storeId: params.storeId,
    },
  });
  return (
    <Suspense fallback={<LoadingOverlay />}>
      <div className=" flex-col">
        <div className=" flex-1 space-y-4 p-8 pt-6">
          <CategoryForm
            initialDataCategory={category}
            initialDataBillboards={billboards}
          />
        </div>
      </div>
    </Suspense>
  );
};

export default CategoryPage;
