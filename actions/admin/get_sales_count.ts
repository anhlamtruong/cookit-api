import prismaMySQL from "@/lib/service/prisma_mysql";

export const getSalesCount = async (storeId: string) => {
  const salesCount = await prismaMySQL.order.count({
    where: {
      storeId,
    },
  });

  return salesCount;
};
