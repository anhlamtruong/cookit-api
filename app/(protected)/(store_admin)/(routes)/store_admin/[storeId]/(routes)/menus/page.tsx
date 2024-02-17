import { MenusClient } from "./_components/menus_client";
import prismaMySQL from "@/lib/service/prisma_mysql";
import { format } from "date-fns";
import { MenusColumn } from "./_components/columns";
import { formatter } from "@/lib/utils";
const MenusPage = async ({ params }: { params: { storeId: string } }) => {
  const menus = await prismaMySQL.menu.findMany({
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
    price: formatter.format(item.price.toNumber()),
    category: item.category.name,
    size: item.size.quantity,
    isFeatured: item.isFeatured,
    isArchived: item.isArchived,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <MenusClient data={formattedMenus}></MenusClient>
      </div>
    </div>
  );
};

export default MenusPage;
