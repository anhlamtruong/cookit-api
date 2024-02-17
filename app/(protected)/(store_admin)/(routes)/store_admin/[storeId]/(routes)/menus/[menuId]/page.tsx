import { MenuForm } from "./_components/menu_form";
import prismaMySQL from "@/lib/service/prisma_mysql";

const MenuPage = async ({
  params,
}: {
  params: { menuId: string; storeId: string };
}) => {
  const menu = await prismaMySQL.menu.findUnique({
    where: {
      id: params.menuId,
    },
    include: {
      images: true,
    },
  });
  const categories = await prismaMySQL.category.findMany({
    where: {
      storeId: params.storeId,
    },
  });

  const sizes = await prismaMySQL.size.findMany({
    where: {
      storeId: params.storeId,
    },
  });
  return (
    <div className=" flex-col">
      <div className=" flex-1 space-y-4 p-8 pt-6">
        <MenuForm
          initialDataMenu={menu}
          sizes={sizes}
          categories={categories}
        />
      </div>
    </div>
  );
};

export default MenuPage;
