import prismaMySQL from "@/lib/service/prisma_mysql";

export const getStockCount = async (storeId: string) => {
  const stockCount = await prismaMySQL.menu.count({
    where: {
      storeId,
    },
  });

  return stockCount;
};
