import { PrismaClient as PrismaClientMySQL } from "@/generated/mysql/@prisma-client-mysql";

const prismaClientSingleton = () => {
  return new PrismaClientMySQL();
};

declare global {
  var prismaMySQL: undefined | ReturnType<typeof prismaClientSingleton>;
}

const prismaMySQL = global.prismaMySQL ?? prismaClientSingleton();

if (process.env.NODE_ENV !== "production") global.prismaMySQL = prismaMySQL;

export default prismaMySQL;
