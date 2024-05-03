import { MenusClient } from "./_components/menus_client";
import prismaStore from "@/lib/service/prisma_store";
import { format } from "date-fns";
import { MenusColumn } from "./_components/columns";
import { formatter } from "@/lib/utils";
import { Suspense } from "react";
import LoadingOverlay from "@/components/loading_overlay";
const MenusPage = async ({ params }: { params: { storeId: string } }) => {
  const menus = await prismaStore.menu.findMany({
    where: { storeId: params.storeId },
    include: {
      category: true,
      size: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedMenus: MenusColumn[] = menus.map((item) => ({
    id: item.id,
    name: item.name,
    price: formatter.format(item.price),
    category: item.category.name,
    size: item.size.quantity,
    isFeatured: item.isFeatured,
    isArchived: item.isArchived,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));
  return (
    <Suspense fallback={<LoadingOverlay />}>
      <div className="flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <MenusClient data={formattedMenus}></MenusClient>
        </div>
      </div>
    </Suspense>
  );
};

export default MenusPage;
