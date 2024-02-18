import { Suspense } from "react";
import { MenuForm } from "./_components/menu_form";
import prismaStore from "@/lib/service/prisma_store";
import { ClimbingBoxLoader } from "react-spinners";

const MenuPage = async ({
  params,
}: {
  params: { menuId: string; storeId: string };
}) => {
  let menu = null;
  if (params.menuId !== "new") {
    menu = await prismaStore.menu.findUnique({
      where: {
        id: params.menuId,
      },
      include: {
        images: true,
      },
    });
  }
  const categories = await prismaStore.category.findMany({
    where: {
      storeId: params.storeId,
    },
  });

  const sizes = await prismaStore.size.findMany({
    where: {
      storeId: params.storeId,
    },
  });
  return (
    <Suspense fallback={<ClimbingBoxLoader />}>
      <div className=" flex-col">
        <div className=" flex-1 space-y-4 p-8 pt-6">
          <MenuForm
            initialDataMenu={menu}
            sizes={sizes}
            categories={categories}
          />
        </div>
      </div>
    </Suspense>
  );
};

export default MenuPage;
